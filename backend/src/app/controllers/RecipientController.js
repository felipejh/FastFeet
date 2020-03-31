import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { name } = req.query;

    const whereStatement = {}

    if (name){
      whereStatement.name = {[Op.iLike]: `%${name}%`};
    }

    const recipients = await Recipient.findAll({
      where: whereStatement,
    });

    return res.json(recipients);
  }

  async store(req, res) {

    const schema = await Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required().matches(/^[0-9]{5}(?:-[0-9]{3})?$/, 'Must be 5 or 9 digits'),
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name,
      street,
      number,
      complement,
      state,
      city,
      zip_code } = req.body;

    const RecipientsExists = await Recipient.findOne({
      where: {
        name,
        street,
        number,
        complement,
        state,
        city,
        zip_code,
      }
    });

    if (RecipientsExists) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const recipients = await Recipient.create(req.body);

    return res.json(recipients);

  }

  async update(req, res){
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string().matches(/^[0-9]{5}(?:-[0-9]{3})?$/, 'Must be 5 or 9 digits'),
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not exists' });
    }

    const newRecipient = await recipient.update(req.body);

    return res.status(200).json(newRecipient)
  }

  async delete(req, res){
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not exists' });
    }

    await recipient.destroy();

    return res.status(200).json({ message: 'Recipient is deleted.' })

  }
}

export default new RecipientController();
