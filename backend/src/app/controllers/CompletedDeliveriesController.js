import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class CompletedDeliveriesController {
  async index(req, res) {
    const deliveryman_id = req.params.id;
    const { page = 1 } = req.query;

    const delivery = await Delivery.findAll({
      where: { deliveryman_id, canceled_at: null, end_date: { [Op.not]: null } },
      limit: 10,
      offset: (page - 1) * 10,
      order: ['created_at'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'number', 'complement', 'city', 'state', 'zip_code']
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url']
        }
      ]
    });
    // Retorna total de itens para tratamento do onEndReached do FlatList do RN
    const total = await Delivery.count({
      where: { deliveryman_id, canceled_at: null, end_date: { [Op.not]: null } },
    })
    res.set('x-total-count', total);

    return res.json(delivery);
  }
}

export default new CompletedDeliveriesController();
