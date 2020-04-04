import * as Yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import NewDeliveryMail from '../jobs/NewDeliveryMail';
import Queue from '../../lib/Queue';

class OrderController {
  async index(req, res) {
    const { product, page = 1 } = req.query;

    const whereStatement = {};

    const pagination = 5;

    // Se foi informado produto, busca em todas as partes do nome de modo case-insensitive
    if (product) {
      whereStatement.product = { [Op.iLike]: `%${product}%` };
    }

    const deliveries = await Delivery.findAll({
      where: whereStatement,
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date', 'status'],
      limit: pagination,
      offset: (page - 1) * pagination,
      order: ['id'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'city', 'state', 'street', 'number', 'complement', 'zip_code'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            }
          ]
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ]
    });

    const { total } = await Deliveryman.paginate();

    return res.json({
      deliveries,
      itemsPerPage: pagination,
      totalItems: total
    });
  }

  async store(req, res) {
    const schema = await Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string()
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id, product } = req.body;

    /**
     * Check if recipient_id is a recipient
     */
    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient is not exists.' });
    }

    /**
     * Check if deliveryman_id is a deliveryman
     */
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman is not exists.' });
    }

    let delivery = await Delivery.create({
      recipient_id,
      deliveryman_id,
      product,
    })

    delivery = { delivery, deliveryman, recipient }
    /**
     * Envia email
     */
    await Queue.add(NewDeliveryMail.key, {
      delivery,
    })

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = await Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string()
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const delivery = await Delivery.findByPk(req.params.id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'number', 'complement', 'city', 'state', 'zip_code']
        }
      ]
    });

    /**
     * Check if delivery exists
     */
    if (!delivery) {
      res.status(400).json({ error: 'Delivery is not found.' })
    }

    const newDelivery = await delivery.update(req.body);

    return res.json(newDelivery);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      res.status(400).json({ error: 'Delivery is not found.' })
    }

    await delivery.destroy();

    return res.json({ ok: true })
  }
}

export default new OrderController();
