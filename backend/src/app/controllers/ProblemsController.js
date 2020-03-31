import DeliveryProblem from '../models/DeliveryProblem';

class ProblemsController{
  async index(req, res){
    const problems = await DeliveryProblem.findAll({
      attributes:['id', 'delivery_id', 'description'],
    });

    return res.json(problems);
  }
}

export default new ProblemsController();
