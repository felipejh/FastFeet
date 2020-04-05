import React, { useState, useEffect, useMemo } from 'react';
import { TouchableOpacity, Alert, StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';

import Background from '~/components/Background';
import Timeline from '~/components/Timeline';

import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  Header,
  Avatar,
  TextHeader,
  Deliveryman,
  Welcome,
  Logout,
  PageTitle,
  Title,
  TypeDeliveryContainer,
  PendingText,
  PendingButton,
  DeliveredButton,
  DeliveredText,
  PendingList,
  PendingItem,
  Delivery,
  IconTruck,
  Name,
  TopContainer,
  BottomContainer,
  DateContainer,
  Description,
  CityContainer,
  Label,
  LinkDetails,
  LinkDetailsText,
  AvatarLetters,
  Letters,
  Loading,
  LoadingContainer,
} from './styles';

export default function Dashboard({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [visiblePending, setVisiblePending] = useState(true);
  const [visibleDelivered, setVisibleDelivered] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const deliveryman = useSelector(state => state.user.profile);

  const letters = useMemo(() => {
    return deliveryman.name.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g);
  }, [deliveryman]);

  const hasScroll = useMemo(() => {
    return totalItems > 0 && orders.length >= totalItems;
  }, [totalItems]);

  async function loadPending(pageNumber = 1) {
    setLoading(true);
    try {
      const response = await api.get(`deliveryman/${deliveryman.id}/pending`, {
        params: {
          page: pageNumber,
        },
      });

      if (response.data.length > 0) {
        setTotalItems(response.headers['x-total-count']);

        const newOrders = response.data.map(order => {
          const date = order.start_date ? order.start_date : order.createdAt;

          return {
            ...order,
            dateFormatted: format(parseISO(date), 'dd/MM/yyyy', {
              locale: pt,
            }),
          };
        });

        setOrders(pageNumber >= 2 ? [...orders, ...newOrders] : newOrders);
        setPage(pageNumber);
        setRefreshing(false);
      }
    } catch (err) {
      Alert.alert('Ops...', 'Ocorreu um erro ao busca as entregas pendentes');
    }
    setLoading(false);
  }
  async function loadDelivered(pageNumber = 1) {
    setLoading(true);
    try {
      const response = await api.get(
        `deliveryman/${deliveryman.id}/completed`,
        {
          params: {
            page: pageNumber,
          },
        }
      );

      if (response.data.length > 0) {
        setTotalItems(response.headers['x-total-count']);
        const newOrders = response.data.map(order => {
          const date = order.start_date ? order.start_date : order.createdAt;

          return {
            ...order,
            dateFormatted: format(parseISO(date), 'dd/MM/yyyy', {
              locale: pt,
            }),
          };
        });

        setOrders(pageNumber >= 2 ? [...orders, ...newOrders] : newOrders);
        setPage(pageNumber);
        setRefreshing(false);
      }
    } catch (err) {
      Alert.alert(
        'Ops...',
        'Ocorreu um erro ao busca as entregas que foram entregues'
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    if (visiblePending && isFocused) {
      loadPending();
    }
    if (visibleDelivered) {
      loadDelivered();
    }
  }, [visiblePending, visibleDelivered, isFocused]);

  function handleLogout() {
    dispatch(signOut());
  }

  function handlePending() {
    setOrders([]);
    setVisiblePending(true);
    setVisibleDelivered(false);
  }

  function handleDelivered() {
    setOrders([]);
    setVisiblePending(false);
    setVisibleDelivered(true);
  }

  function handleDetails(item) {
    navigation.navigate('OrderDetail', { item });
  }

  function loadMore() {
    console.tron.log('LOAD_MORE');
    if (visiblePending) {
      if (!hasScroll) return;
      loadPending(page + 1);
    }

    if (visibleDelivered) {
      if (!hasScroll) return;
      loadDelivered(page + 1);
    }
  }

  function refreshList() {
    setOrders([]);

    if (visiblePending) {
      loadPending();
    }

    if (visibleDelivered) {
      loadDelivered();
    }
  }

  return (
    <Background>
      <StatusBar barStyle="dark-content" />

      {loading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}

      <Container>
        <Header>
          {deliveryman.avatar ? (
            <Avatar source={{ uri: deliveryman.avatar.url }} />
          ) : (
            <AvatarLetters>
              <Letters>{letters}</Letters>
            </AvatarLetters>
          )}

          <TextHeader>
            <Welcome>Bem vindo de volta,</Welcome>
            <Deliveryman>{deliveryman.name}</Deliveryman>
          </TextHeader>
          <TouchableOpacity onPress={handleLogout}>
            <Logout />
          </TouchableOpacity>
        </Header>

        <PageTitle>
          <Title>Entregas</Title>
          <TypeDeliveryContainer>
            <PendingButton active={visiblePending} onPress={handlePending}>
              <PendingText active={visiblePending}>Pendentes</PendingText>
            </PendingButton>
            <DeliveredButton
              active={visibleDelivered}
              onPress={handleDelivered}
            >
              <DeliveredText active={visibleDelivered}>Entregues</DeliveredText>
            </DeliveredButton>
          </TypeDeliveryContainer>
        </PageTitle>

        <PendingList
          loading={loading}
          data={orders}
          onRefresh={refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
          refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
          onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
          onEndReached={loadMore} // Função que carrega mais itens
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <PendingItem>
              <TopContainer>
                <Delivery>
                  <IconTruck />
                  <Name>Encomenda {item.id}</Name>
                </Delivery>
                <Timeline status={item.status} />
              </TopContainer>
              <BottomContainer>
                <DateContainer>
                  <Label>Data</Label>
                  <Description>{item.dateFormatted}</Description>
                </DateContainer>
                <CityContainer>
                  <Label>Cidade</Label>
                  <Description>{item.recipient.city}</Description>
                </CityContainer>
                <LinkDetails onPress={() => handleDetails({ order: item })}>
                  <LinkDetailsText>Ver detalhes</LinkDetailsText>
                </LinkDetails>
              </BottomContainer>
            </PendingItem>
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
