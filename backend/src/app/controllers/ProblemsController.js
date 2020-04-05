import DeliveryProblem from '../models/DeliveryProblem';

class ProblemsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const pagination = 5;

    const problems = await DeliveryProblem.findAll({
      limit: pagination,
      offset: (page - 1) * pagination,
      attributes: ['id', 'delivery_id', 'description'],
    });

    const { total } = await DeliveryProblem.paginate();

    return res.json({
      problems,
      itemsPerPage: pagination,
      totalItems: total
    });
  }
}

export default new ProblemsController();
