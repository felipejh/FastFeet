import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymansController {
  async index(req, res) {
    const { name, page = 1 } = req.query;

    const whereStatement = {};

    const pagination = 5;

    if (name) {
      whereStatement.name = { [ Op.iLike ]: `%${name}%` };
    }

    const deliverymans = await Deliveryman.findAll({
      where: whereStatement,
      attributes: ['id', 'name', 'email'],
      limit: pagination,
      offset: (page - 1) * pagination,
      order: ['id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url']
        }
      ]
    });
    // eslint-disable-next-line no-unused-vars
    const { docs, pages, total } = await Deliveryman.paginate();

    return res.json({
      deliverymans,
      itemsPerPage: pagination,
      totalItems: total
    });
  }

  async store(req, res) {
    const schema = await Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  }

  async update(req, res) {
    const schema = await Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Busca o entregador
     */
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not exists' });
    }

    const newDeliveryman = await deliveryman.update(req.body);

    return res.json(newDeliveryman);
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not exists' });
    }

    await deliveryman.destroy();

    return res.status(200).json({ message: 'Deliveryman is deleted.' })
  }
}

export default new DeliverymansController();
