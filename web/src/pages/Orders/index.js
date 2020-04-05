import React, { useEffect, useState } from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import Modal from 'react-modal';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import OrderStatus from '~/components/OrderStatus';
import ActionsButton from '~/components/ActionsButton';
import PaginationButtons from '~/components/PaginationButtons';

import {
  Container,
  PageTitle,
  PageControls,
  SearchContainer,
  OrderTable,
  ContentModal,
  Signature,
  Filters,
} from './styles';

export default function Orders() {
  // const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [product, setProduct] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalItems, setTotaItems] = useState(0);

  // Filters
  const [filterProblems, setFilterProblemas] = useState(false);

  const renderPrev = page > 1;
  const renderNext =
    itemsPerPage * page < totalItems && itemsPerPage <= orders.length;

  function handlePrevPage() {
    if (page === 1) return;
    setPage(page - 1);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  const styleModal = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  async function loadOrders() {
    // setLoading(true);

    const { data } = await api.get('deliveries', {
      params: {
        product,
        page,
        filterProblems,
      },
    });

    if (data) {
      const newData = data.deliveries.map(o => ({
        ...o,
        startDateFormatted: o.start_date
          ? format(parseISO(o.start_date), 'dd/MM/yyyy', {
              locale: pt,
            })
          : null,
        endDateFormatted: o.end_date
          ? format(parseISO(o.end_date), 'dd/MM/yyyy', {
              locale: pt,
            })
          : null,
      }));

      if (newData.length > 0) {
        setOrders(newData);
        setItemsPerPage(data.itemsPerPage);
        setTotaItems(data.totalItems);
      } else {
        toast.error('Nenhuma encomenda encontrada');
      }
    }

    // setLoading(false);
  }

  useEffect(() => {
    async function load() {
      await loadOrders(null);
    }
    load();
    // eslint-disable-next-line
  }, [page, filterProblems]);

  function handleSearch(e) {
    if (e.key === 'Enter') {
      loadOrders();
    }
  }

  /**
   * Função para quando clicar em um botão de ação com outro já aberto,
   * este outro feche
   * @param {ID da ordem clicada} orderId
   */
  // function handleActions(orderId) {
  //   const newOrders = orders.map(order => ({
  //     ...order,
  //     visible: order.visible ? !order.visible : order.id === orderId,
  //   }));
  //   console.tron.log(newOrders);
  //   setOrders(newOrders);
  // }

  function openModal(orderId) {
    const order = orders.find(o => o.id === orderId);

    setOrderDetail(order);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function handleRegister() {
    history.push('/orderCRUD');
  }

  function handleEdit(order) {
    history.push({ pathname: '/orderCRUD', state: { order } });
  }

  async function handleDelete(order) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Confirma a exclusão da encomenda?')) {
      try {
        await api.delete(`deliveries/${order.id}`);
        loadOrders();
        toast.success('Encomenda excluída com sucesso!');
      } catch (err) {
        toast.error('Ocorreu um erro ao excluir a encomenda');
      }
    }
  }

  function handleFilterProblems() {
    setFilterProblemas(!filterProblems);
  }

  return (
    <Container>
      <PageTitle>Gestão de encomendas</PageTitle>
      <PageControls>
        <Filters>
          <SearchContainer>
            <MdSearch size={20} color="#999" />
            <input
              placeholder="Busca por encomendas"
              onKeyPress={handleSearch}
              value={product}
              onChange={e => setProduct(e.target.value)}
            />
          </SearchContainer>
          <input
            type="checkbox"
            onChange={handleFilterProblems}
            checked={filterProblems}
          />
          <span>Encomendas com problema</span>
        </Filters>
        <button type="button" onClick={handleRegister}>
          <MdAdd size={20} color="#fff" />
          <strong>Cadastrar</strong>
        </button>
      </PageControls>
      <OrderTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Produto</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.recipient.name}</td>
              <td>{order.product}</td>
              <td>
                <img
                  src={
                    order.deliveryman.avatar
                      ? order.deliveryman.avatar.url
                      : 'https://api.adorable.io/avatars/40/abott@adorable.png'
                  }
                  alt={order.deliveryman.name}
                />
                {order.deliveryman.name}
              </td>
              <td>{order.recipient.city}</td>
              <td>{order.recipient.state}</td>
              <td>
                <OrderStatus status={order.status} />
              </td>
              <td>
                <ActionsButton
                  view
                  edit={order.status === 'PENDENTE'}
                  remove
                  actionView={() => openModal(order.id)}
                  actionEdit={() => handleEdit(order)}
                  actionDelete={() => handleDelete(order)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </OrderTable>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={styleModal}
      >
        <ContentModal>
          <div>
            <strong>Informações da encomenda</strong>
            {orderDetail.recipient ? (
              <>
                <p>
                  {orderDetail.recipient.street},&nbsp;
                  {orderDetail.recipient.number}
                </p>
                <p>
                  {orderDetail.recipient.city}&nbsp;-&nbsp;
                  {orderDetail.recipient.state}
                </p>
                <p>{orderDetail.recipient.zip_code}</p>
              </>
            ) : null}
          </div>
          <div>
            <strong>Datas</strong>
            <p>Retirada: {orderDetail.startDateFormatted}</p>
            <p>Entrega: {orderDetail.endDateFormatted}</p>
          </div>
          <div>
            <strong>Assinatura do destinatário</strong>
            {orderDetail.signature ? (
              <Signature>
                <img
                  src={orderDetail.signature.url}
                  alt={orderDetail.recipient.name}
                />
              </Signature>
            ) : null}
          </div>
        </ContentModal>
      </Modal>
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
