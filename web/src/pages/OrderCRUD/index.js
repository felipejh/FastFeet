import React, { useState, useEffect } from 'react';
import { MdNavigateBefore, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import api from '~/services/api';
import AsyncSelect from '~/components/AsyncSelect';

import {
  Container,
  PageTitle,
  PageControls,
  PageHeader,
  Content,
} from './styles';

const propTypes = {
  history: PropTypes.shape(),
};

// const schema = Yup.object().shape({
//   recipient: Yup.string()
//     .ensure()
//     .required('Informe um destinatário'),
//   deliveryman: Yup.string()
//     .ensure()
//     .required('Informe um entregador'),
//   product: Yup.string().required('Informe um produto'),
// });

const schema = Yup.object().shape({
  product: Yup.string().required('Informe um produto'),
});

export default function OrderCRUD({ history }) {
  const order = history.location.state ? history.location.state.order : null;
  const [recipient, setRecipient] = useState({});
  const [deliveryman, setDeliveryman] = useState({});
  const [recipients, setRecipients] = useState([]);
  const [deliverymans, setDeliverymans] = useState([]);

  // Set the product
  const editProduct = {
    product: order ? order.product : '',
  };

  const onChangeRecipient = inputValue => {
    setRecipient(inputValue);
  };

  const onChangeDeliveryman = inputValue => {
    setDeliveryman(inputValue);
  };

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients');

      if (response.data) {
        const result = response.data.map(r => {
          return { value: r.id, label: r.name };
        });
        setRecipients(result);
      }
    }

    async function loadDeliverymans() {
      const response = await api.get('deliverymans');

      if (response.data) {
        const result = response.data.map(d => {
          return { value: d.id, label: d.name };
        });
        setDeliverymans(result);
      }
    }

    async function loadOrder() {
      setRecipient({ value: order.recipient.id, label: order.recipient.name });
      setDeliveryman({
        value: order.deliveryman.id,
        label: order.deliveryman.name,
      });
    }

    loadRecipients();
    loadDeliverymans();

    // Se veio do botão 'Editar', carrega os dados da encomenda.
    if (order) {
      loadOrder();
    }
    // eslint-disable-next-line
  }, []);

  async function handleSubmit({ product }) {
    const body = {
      recipient_id: recipient.value,
      deliveryman_id: deliveryman.value,
      product,
    };

    // Se não tem 'order', é um cadastro novo
    if (!order) {
      try {
        await api.post(`deliveries`, body);

        toast.success('Encomenda cadastrada com sucesso');
      } catch (err) {
        console.tron.log(err);
        toast.error('Erro ao cadastrar encomenda');
      }
      // Senão, é uma edição
    } else {
      try {
        await api.put(`deliveries/${order.id}`, body);

        toast.success('Encomenda editada com sucesso');
      } catch (err) {
        toast.error('Erro ao editar encomenda');
      }
    }
    history.push('/orders');
  }

  function handleBack() {
    history.push('/orders');
  }

  return (
    <Container>
      <PageHeader>
        <PageTitle>Gestão de encomendas</PageTitle>
        <PageControls>
          <button type="button" onClick={handleBack}>
            <MdNavigateBefore size={20} color="#fff" />
            <strong>Voltar</strong>
          </button>
          <button type="submit" form="deliveries">
            <MdCheck size={20} color="#fff" />
            <strong>Salvar</strong>
          </button>
        </PageControls>
      </PageHeader>
      <Content>
        <Form
          id="deliveries"
          initialData={editProduct}
          schema={schema}
          onSubmit={handleSubmit}
        >
          <AsyncSelect
            name="recipient"
            label="Destinatário"
            options={recipients}
            cacheOptions
            value={recipient.value ? recipient : null}
            onChange={option => {
              onChangeRecipient(option);
            }}
            placeholder="Selecione"
          />

          <AsyncSelect
            name="deliveryman"
            label="Entregador"
            options={deliverymans}
            value={deliveryman.value ? deliveryman : null}
            onChange={onChangeDeliveryman}
            cacheOptions
            placeholder="Selecione"
          />

          <Input
            name="product"
            placeholder="Yamaha SX7"
            label="Nome do produto"
          />
        </Form>
      </Content>
    </Container>
  );
}

OrderCRUD.protoTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    recipient: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    deliveryman: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
};

OrderCRUD.propTypes = propTypes;

OrderCRUD.defaultProps = {
  history: null,
};
