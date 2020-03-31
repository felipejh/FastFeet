import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import CancellationDeliveryMail from '../jobs/CancellationDeliveryMail';
import Queue from '../../lib/Queue';

class CancelDeliveryController {
  async delete(req, res) {
    const { problem_id } = req.params;

    const deliveryProblem = await DeliveryProblem.findByPk(problem_id);

    const delivery = await Delivery.findByPk(deliveryProblem.delivery_id, {
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
        },
      ]
    })

    if (delivery.canceled_at){
      return res.status(400).json({ error: 'This delivery hans been canceled'})
    }

    const canceledDate = new Date();
    const newDelivery = await delivery.update({
      canceled_at: canceledDate
    });

    await Queue.add(CancellationDeliveryMail.key, {
      newDelivery , deliveryProblem
    })

    return res.json(newDelivery);
  }
}

export default new CancelDeliveryController();
