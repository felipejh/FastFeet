import React, { useEffect, useState } from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import ActionsButton from '~/components/ActionsButton';

import {
  Container,
  PageTitle,
  PageControls,
  SearchContainer,
  DeliverymanTable,
} from './styles';

export default function Deliverymans() {
  const [deliverymans, setDeliverymans] = useState([]);
  const [name, setName] = useState('');

  async function loadDeliverymans() {
    const { data } = await api.get('deliverymans', {
      params: {
        name,
      },
    });

    if (data.length > 0) {
      setDeliverymans(data);
    } else {
      toast.error('Nenhum entregador encontrado');
    }
  }

  useEffect(() => {
    async function load() {
      await loadDeliverymans(null);
    }
    load();
    // eslint-disable-next-line
  }, []);

  function handleSearch(e) {
    if (e.key === 'Enter') {
      loadDeliverymans();
    }
  }

  function handleRegister() {
    history.push('/deliverymanCRUD');
  }

  function handleEdit(deliveryman) {
    history.push({ pathname: '/deliverymanCRUD', state: { deliveryman } });
  }

  async function handleDelete(deliveryman) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Confirma a exclusão do entregador?')) {
      try {
        await api.delete(`deliverymans/${deliveryman.id}`);
        loadDeliverymans();
        toast.success('Entregador excluído com sucesso!');
      } catch (err) {
        console.tron.error(err);
        toast.error('Ocorreu um erro ao excluir o entregador');
      }
    }
  }

  return (
    <Container>
      <PageTitle>Gestão de entregadores</PageTitle>
      <PageControls>
        <SearchContainer>
          <MdSearch size={20} color="#999" />
          <input
            placeholder="Busca por entregadores"
            onKeyPress={handleSearch}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </SearchContainer>
        <button type="button" onClick={handleRegister}>
          <MdAdd size={20} color="#fff" />
          <strong>Cadastrar</strong>
        </button>
      </PageControls>
      <DeliverymanTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliverymans.map(deliveryman => (
            <tr key={deliveryman.id}>
              <td>{deliveryman.id}</td>
              <td>
                <img
                  src={
                    deliveryman.avatar
                      ? deliveryman.avatar.url
                      : 'https://api.adorable.io/avatars/40/abott@adorable.png'
                  }
                  alt={deliveryman.name}
                />
              </td>
              <td>{deliveryman.name}</td>
              <td>{deliveryman.email}</td>
              <td>
                <ActionsButton
                  edit
                  remove
                  actionEdit={() => handleEdit(deliveryman)}
                  actionDelete={() => handleDelete(deliveryman)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </DeliverymanTable>
    </Container>
  );
}
