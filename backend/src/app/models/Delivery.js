import Sequelize, { Model } from 'sequelize';
import sequelizePaginate from 'sequelize-paginate';

class Delivery extends Model {
  static init(sequelize) {
    super.init({
      product: Sequelize.STRING,
      canceled_at: Sequelize.DATE,
      start_date: Sequelize.DATE,
      end_date: Sequelize.DATE,
      status: {
        type: Sequelize.VIRTUAL,
        get() {

          if (this.canceled_at) {
            return 'CANCELADA';
          }

          if (this.end_date) {
            return 'ENTREGUE';
          }

          if (this.start_date) {
            return 'RETIRADA';
          }

          return 'PENDENTE';
        }
      }
    }, {
      sequelize
    });
    sequelizePaginate.paginate(this)
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'signature_id', as: 'signature' });
    this.belongsTo(models.Recipient, { foreignKey: 'recipient_id', as: 'recipient' });
    this.belongsTo(models.Deliveryman, { foreignKey: 'deliveryman_id', as: 'deliveryman' });
    this.hasMany(models.DeliveryProblem, { as: 'problems' });
  }
}

export default Delivery;
