import Mail from '../../lib/Mail';

class CancellationDeliveryMail {
  get key() {
    return 'CanceletionDeliveryMail';
  }

  async handle({ data }) {
    const delivery = data.newDelivery;
    const problem = data.deliveryProblem;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Cancelamento de entrega',
      template: 'cancellationDelivery',
      context: {
        deliveryman: delivery.deliveryman.name,
        product: delivery.product,
        recipient: delivery.recipient.name,
        problem: problem.description,
      },
    });
  }
}

export default new CancellationDeliveryMail();
