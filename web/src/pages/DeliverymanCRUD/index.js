import React from 'react';
import { MdNavigateBefore, MdCheck } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import AvatarInput from '~/components/AvatarInput';
import api from '~/services/api';

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

const schema = Yup.object().shape({
  avatar_id: Yup.mixed(),
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obrigatório'),
});

export default function DeliverymanCRUD({ history }) {
  const deliveryman = history.location.state
    ? history.location.state.deliveryman
    : null;
  const pageTitle = deliveryman
    ? 'Edição de entregadores'
    : 'Cadastro de entregadores';

  async function handleSubmit({ name, email, avatar_id }) {
    const body = {
      name,
      email,
      avatar_id,
    };

    // Se não tem 'deliveryman', é um cadastro novo
    if (!deliveryman) {
      try {
        await api.post(`deliverymans`, body);

        toast.success('Entregador cadastrado com sucesso');
      } catch (err) {
        console.tron.error(err);
        toast.error('Erro ao cadastrar entregador');
      }
      // Senão, é uma edição
    } else {
      try {
        await api.put(`deliverymans/${deliveryman.id}`, body);

        toast.success('Entregador editado com sucesso');
      } catch (err) {
        toast.error('Erro ao editar entregador');
      }
    }
    history.push('/deliverymans');
  }

  function handleBack() {
    history.push('/deliverymans');
  }

  return (
    <Container>
      <PageHeader>
        <PageTitle>{pageTitle}</PageTitle>
        <PageControls>
          <button type="button" onClick={handleBack}>
            <MdNavigateBefore size={20} color="#fff" />
            <strong>Voltar</strong>
          </button>
          <button type="submit" form="deliveryman">
            <MdCheck size={20} color="#fff" />
            <strong>Salvar</strong>
          </button>
        </PageControls>
      </PageHeader>
      <Content>
        <Form
          id="deliveryman"
          schema={schema}
          initialData={deliveryman}
          onSubmit={handleSubmit}
        >
          <AvatarInput name="avatar_id" />
          <Input name="name" type="name" placeholder="Seu nome" />
          <Input name="email" type="email" placeholder="example@fastfeet.com" />
        </Form>
      </Content>
    </Container>
  );
}
DeliverymanCRUD.propTypes = propTypes;

DeliverymanCRUD.defaultProps = {
  history: null,
};
