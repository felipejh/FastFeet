import React, { useEffect, useState } from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import ActionsButton from '~/components/ActionsButton';
import PaginationButtons from '~/components/PaginationButtons';

import {
  Container,
  PageTitle,
  PageControls,
  SearchContainer,
  DeliverymanTable,
} from './styles';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [name, setName] = useState('');

  // pagination
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalItems, setTotaItems] = useState(0);

  const renderPrev = page > 1;
  const renderNext =
    itemsPerPage * page < totalItems && itemsPerPage <= recipients.length;

  function handlePrevPage() {
    if (page === 1) return;
    setPage(page - 1);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  async function loadRecipients() {
    const { data } = await api.get('recipients', {
      params: {
        name,
        page,
      },
    });

    if (data.recipients.length > 0) {
      const result = data.recipients.map(r => ({
        ...r,
        address: `${r.street}, ${r.number}, ${r.city} - ${r.state}`,
      }));
      setRecipients(result);
      setItemsPerPage(data.itemsPerPage);
      setTotaItems(data.totalItems);
    } else {
      toast.error('Nenhum destinatário encontrado');
    }
  }

  useEffect(() => {
    async function load() {
      await loadRecipients(null);
    }
    load();
    // eslint-disable-next-line
  }, [page]);

  function handleSearch(e) {
    if (e.key === 'Enter') {
      loadRecipients();
    }
  }

  function handleRegister() {
    history.push('/recipientCRUD');
  }

  function handleEdit(recipient) {
    history.push({ pathname: '/recipientCRUD', state: { recipient } });
  }

  async function handleDelete(recipient) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Confirma a exclusão do entregador?')) {
      try {
        await api.delete(`recipients/${recipient.id}`);
        loadRecipients();
        toast.success('Destinatário excluído com sucesso!');
      } catch (err) {
        console.tron.error(err);
        toast.error('Ocorreu um erro ao excluir o destinatário');
      }
    }
  }

  return (
    <Container>
      <PageTitle>Gestão de destinatários</PageTitle>
      <PageControls>
        <SearchContainer>
          <MdSearch size={20} color="#999" />
          <input
            placeholder="Busca por destinatários"
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
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map(recipient => (
            <tr key={recipient.id}>
              <td>{recipient.id}</td>
              <td>{recipient.name}</td>
              <td>{recipient.address}</td>
              <td>
                <ActionsButton
                  edit
                  remove
                  actionEdit={() => handleEdit(recipient)}
                  actionDelete={() => handleDelete(recipient)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </DeliverymanTable>
      <PaginationButtons
        page={page}
        renderPrev={renderPrev}
        renderNext={renderNext}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </Container>
  );
}
