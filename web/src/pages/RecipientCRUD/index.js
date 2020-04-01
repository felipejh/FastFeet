/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { MdNavigateBefore, MdCheck } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import api from '~/services/api';

import {
  Container,
  PageTitle,
  PageControls,
  PageHeader,
  Content,
  InputStreet,
  InputName,
  InputNumber,
  InputComplement,
  InputCity,
  InputState,
  InputCep,
} from './styles';

const propTypes = {
  history: PropTypes.shape(),
};

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  street: Yup.string().required('A rua é obrigatória'),
  number: Yup.number()
    .typeError('O número é obrigatório')
    .required('O número é obrigatório'),
  complement: Yup.string(),
  city: Yup.string().required('A cidade é obrigatória'),
  state: Yup.string().required('O Estado é obrigatório'),
  zip_code: Yup.string().required('O CEP é obrigatório'),
});

export default function RecipientCRUD({ history }) {
  const recipient = history.location.state
    ? history.location.state.recipient
    : null;
  const pageTitle = recipient
    ? 'Edição de destinatários'
    : 'Cadastro de destinatários';

  async function handleSubmit(data) {
    const body = data;

    console.tron.log(body);
    // Se não tem 'deliveryman', é um cadastro novo
    if (!recipient) {
      try {
        await api.post(`recipients`, body);

        toast.success('Destinatário cadastrado com sucesso');
      } catch (err) {
        console.tron.error(err);
        toast.error('Erro ao cadastrar destinatário');
      }
      // Senão, é uma edição
    } else {
      try {
        await api.put(`recipients/${recipient.id}`, body);

        toast.success('Destinatário editado com sucesso');
      } catch (err) {
        console.tron.error(err);
        toast.error('Erro ao editar destinatário');
      }
    }
    history.push('/recipients');
  }

  function handleBack() {
    history.push('/recipients');
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
          <button type="submit" form="recipient">
            <MdCheck size={20} color="#fff" />
            <strong>Salvar</strong>
          </button>
        </PageControls>
      </PageHeader>
      <Content>
        <Form
          id="recipient"
          schema={schema}
          initialData={recipient}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name2">
              <strong id="name2">Nome</strong>
              <InputName
                name="name"
                type="name"
                placeholder="Ludwig van Beethoven"
              />
            </label>
          </div>
          <div>
            <label>
              <strong>Rua</strong>
              <InputStreet
                name="street"
                type="text"
                placeholder="Rua Beethoven"
              />
            </label>
            <label>
              <strong>Número</strong>
              <InputNumber name="number" type="number" placeholder="1729" />
            </label>
            <label>
              <strong>Complemento</strong>
              <InputComplement name="complement" type="text" placeholder="" />
            </label>
          </div>
          <div>
            <label>
              <strong>Cidade</strong>
              <InputCity name="city" type="text" placeholder="Diadema" />
            </label>
            <label>
              <strong>Estado</strong>
              <InputState name="state" type="text" placeholder="São Paulo" />
            </label>
            <label>
              <strong>CEP</strong>
              <InputCep name="zip_code" type="text" placeholder="09960-580" />
            </label>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
RecipientCRUD.propTypes = propTypes;

RecipientCRUD.defaultProps = {
  history: null,
};
