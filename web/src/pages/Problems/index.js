import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '~/services/api';
import ModalProblems from './ModalProblems';

import ActionsButton from '~/components/ActionsButton';
import PaginationButtons from '~/components/PaginationButtons';

import {
  Container,
  PageTitle,
  DeliverymanTable,
  ColumnId,
  ColumnDescription,
  ColumnActions,
} from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [problemModal, setProblemModal] = useState('');

  // pagination
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalItems, setTotaItems] = useState(0);

  const renderPrev = page > 1;
  const renderNext =
    itemsPerPage * page < totalItems && itemsPerPage <= problems.length;

  function handlePrevPage() {
    if (page === 1) return;
    setPage(page - 1);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  async function loadProblems() {
    try {
      const { data } = await api.get('problems');
      setProblems(data.problems);
      setItemsPerPage(data.itemsPerPage);
      setTotaItems(data.totalItems);
    } catch (err) {
      console.tron.error(err);
      toast.error('Nenhum problema encontrado');
    }
  }

  useEffect(() => {
    async function load() {
      await loadProblems();
    }
    load();
  }, [page]);

  function handleView(problemDescription) {
    setProblemModal(problemDescription);
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  async function handleCancel(problem) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Confirma o cancelamento da entrega?')) {
      try {
        await api.delete(`problem/${problem.id}/cancel-delivery`);
        loadProblems();
        toast.success('Encomenda cancelada com sucesso!');
      } catch (err) {
        console.tron.error(err);
        toast.error('Ocorreu um erro ao cancelar a encomenda');
      }
    }
  }

  return (
    <Container>
      <PageTitle>Problemas na entrega</PageTitle>
      <DeliverymanTable>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problems.map(problem => (
            <tr key={problem.id}>
              <ColumnId>{problem.delivery_id}</ColumnId>
              <ColumnDescription>{problem.description}</ColumnDescription>
              <ColumnActions>
                <ActionsButton
                  view
                  cancel
                  actionView={() => handleView(problem.description)}
                  actionCancel={() => handleCancel(problem)}
                />
              </ColumnActions>
            </tr>
          ))}
        </tbody>
      </DeliverymanTable>

      <ModalProblems
        title="VISUALIZAR PROBLEMA"
        description={problemModal}
        isOpen={modalVisible}
        onRequestClose={handleCloseModal}
      />

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
