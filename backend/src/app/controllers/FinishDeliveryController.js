import Delivery from '../models/Delivery';
import File from '../models/File';
import Recipient from '../models/Recipient';

class FinishDeliveryController {
  async update(req, res) {
    const { delivery_id } = req.query;
    const { deliveryman_id } = req.params;

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ error: 'This delivery is not exists' });
    }

    if (delivery.canceled_at) {
      return res.status(401).json({ error: 'This delivery has been canceled' });
    }

    if (delivery.end_date) {
      return res.status(401).json({ error: 'This delivery has been delivered' });
    }

    // eslint-disable-next-line eqeqeq
    if (delivery.deliveryman_id != deliveryman_id){
      return res.status(401).json({ error: 'This delivery is belong another deliveryman' });
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    const endDate = new Date();
    let newDelivery = await delivery.update({
      end_date: endDate,
      signature_id: file.id,
    });

    newDelivery = await Delivery.findByPk(delivery_id, {
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'number', 'complement', 'city', 'state', 'zip_code']
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        }
      ]
    })

    return res.json(newDelivery);
  }
}

export default new FinishDeliveryController();
