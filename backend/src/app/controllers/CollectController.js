import * as Yup from 'yup';
import { Op } from 'sequelize';
import { parseISO, isBefore, setSeconds, setMinutes, setHours, format, isAfter, startOfDay, endOfDay } from 'date-fns';
import Delivery from '../models/Delivery';

class CollectController {
  async update(req, res) {
    const schema = await Yup.object().shape({
      delivery_id: Yup.number().required()
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliveryman_id }= req.params;
    const { delivery_id } = req.body;

    const delivery = await Delivery.findByPk(delivery_id);

    if (delivery.start_date) {
      return res.status(401).json({ error: 'This order is already withdrawal' })
    }

    // eslint-disable-next-line eqeqeq
    if (delivery.deliveryman_id != deliveryman_id) {
      return res.status(401).json({ error: 'This delivery is belong another deliveryman.' })
    }

    const startDate = new Date();

    /**
     * Check if deliveryman has been five deliveries today
     */
    const deliveriesToday = await Delivery.findAndCountAll({
      where: {
        deliveryman_id,
        canceled_at: null,
        end_date: null,
        start_date: {
          [Op.between]: [startOfDay(startDate), endOfDay(startDate)],
        },
      }
    });

    if (deliveriesToday.count > 5){
      return res.status(401).json({ error: 'Only five deliveries per day are allowed'});
    }
    /**
     * Check if hour is between 8h and 18h
     */
    let startTime = "18:00";
    let endTime = "23:59";


    const [startHour, startMinute] = startTime.split(':');
    startTime = parseISO(format(setSeconds(setMinutes(setHours(startDate, startHour), startMinute), 0), "yyyy-MM-dd'T'HH:mm:ssxxx"));

    const [endHour, endMinute] = endTime.split(':');
    endTime = parseISO(format(setSeconds(setMinutes(setHours(startDate, endHour), endMinute), 0), "yyyy-MM-dd'T'HH:mm:ssxxx"));

    if (!(isAfter(startDate, startTime) && isBefore(startDate, endTime))) {
      return res.status(400).json({ error: 'The time for deliveries is between 08h and 18h.' })
    }

    const newDelivery = await delivery.update({start_date: startDate});

    return res.json(newDelivery);
  }
}

export default new CollectController();
