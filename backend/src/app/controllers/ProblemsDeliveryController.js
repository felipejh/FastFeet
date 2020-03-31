import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class ProblemsDeliveryController {
  async index(req, res) {
    const { delivery_id } = req.params;

    const deliveryProblems = await DeliveryProblem.findAll({
      where: { delivery_id },
    });

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const schema = await Yup.object().shape({
      description: Yup.string(),
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { delivery_id } = req.params;
    const { description } = req.body;

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

    const deliveryProblems = await DeliveryProblem.create({
      delivery_id,
      description
    })

    return res.json(deliveryProblems);

  }
}

export default new ProblemsDeliveryController();
