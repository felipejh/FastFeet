import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class SessionDeliverymanController {
  async store(req, res) {
    const schema = await Yup.object().shape({
      deliveryman_id: Yup.number().required(),
    })

    if (!await schema.isValid(req.body)){
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { deliveryman_id } = req.body;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id, {
      attributes: ['id', 'name', 'email', 'created_at'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        }
      ]
    })

    return res.json(deliveryman);
  }
}

export default new SessionDeliverymanController();
