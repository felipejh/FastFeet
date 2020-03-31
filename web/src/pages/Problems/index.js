import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '~/services/api';
import ModalProblems from './ModalProblems';

import ActionsButton from '~/components/ActionsButton';

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

  async function loadProblems() {
    try {
      const response = await api.get('problems');
      setProblems(response.data);
    } catch (err) {
      console.tron.error(err);
      toast.error('Ocorreu um erro ao buscar os problemas');
    }
  }

  useEffect(() => {
    async function load() {
      await loadProblems();
    }
    load();
    // eslint-disable-next-line
  }, []);

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
    </Container>
  );
}
