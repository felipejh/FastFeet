import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';

class Recipient extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      street: Sequelize.STRING,
      number: Sequelize.INTEGER,
      complement: Sequelize.STRING,
      state: Sequelize.STRING,
      city: Sequelize.STRING,
      zip_code: Sequelize.STRING
    },
    {
      sequelize,
    });
    sequelizePaginate.paginate(this)
    return this;
  }
}

export default Recipient;
