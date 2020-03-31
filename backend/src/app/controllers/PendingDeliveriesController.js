import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class PendingDeliveriesController {
  async index(req, res) {
    const deliveryman_id = req.params.id;
    const { page = 1 } = req.query;

    const delivery = await Delivery.findAll({
      where: { deliveryman_id, canceled_at: null, end_date: null },
      limit: 10,
      offset: (page - 1) * 10,
      order: ['created_at'],
      include: [{
        model: Recipient,
        as: 'recipient',
        attributes: ['name', 'street', 'number', 'complement', 'city', 'state', 'zip_code']
      },
      {
        model: Deliveryman,
        as: 'deliveryman',
        attributes: ['id', 'name', 'email', 'created_at'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          }
        ]
      }]
    });

    return res.json(delivery);
  }
}

export default new PendingDeliveriesController();
