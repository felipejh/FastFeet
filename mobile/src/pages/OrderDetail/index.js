import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '~/styles/colors';

import {
  Container,
  Information,
  Situation,
  Actions,
  Title,
  TitleContainer,
  Label,
  Field,
  Dates,
  DateBlock,
  InformProblem,
  ViewProblem,
  ConfirmDelivery,
  ButtonText,
  HeaderBackground,
  Scroll,
} from './styles';

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape().isRequired,
};

export default function OrderDetail({ navigation, route }) {
  const { order } = route.params.item;
  const { recipient } = order;

  const addressFormatted = useMemo(
    () =>
      `${recipient.street}, ${recipient.number}, ${recipient.complement}, ${recipient.city} - ${recipient.state}, ${recipient.zip_code}`,
    [order]
  );

  const status = useMemo(
    () => order.status.charAt(0) + order.status.slice(1).toLowerCase(),
    [order]
  );

  const startDateFormatted = useMemo(() => {
    if (order.start_date) {
      return format(parseISO(order.start_date), 'dd/MM/yyyy', { locale: pt });
    }
    return '--/--/--';
  }, [order]);

  const endDateFormatted = useMemo(() => {
    if (order.end_date) {
      return format(parseISO(order.end_date), 'dd/MM/yyyy', { locale: pt });
    }
    return '--/--/--';
  }, [order]);

  const delivered = useMemo(() => !!order.end_date, [order]);

  const textConfirmDelivery = order.end_date
    ? 'Visualizar confirmação'
    : 'Confirmar entrega';

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <HeaderBackground />
      <Container>
        <Scroll>
          <Information>
            <TitleContainer>
              <Icon name="local-shipping" size={20} color={colors.primary} />
              <Title>Informações da entrega</Title>
            </TitleContainer>

            <Label>DESTINATÁRIO</Label>
            <Field>{recipient.name}</Field>

            <Label>ENDEREÇO DA ENTREGA</Label>
            <Field>{addressFormatted}</Field>

            <Label>PRODUTO</Label>
            <Field>{order.product}</Field>
          </Information>

          <Situation>
            <TitleContainer>
              <Icon name="event" size={20} color={colors.primary} />
              <Title>Situação da entrega</Title>
            </TitleContainer>

            <Label>STATUS</Label>
            <Field>{status}</Field>

            <Dates>
              <DateBlock>
                <Label>DATA DE RETIRADA</Label>
                <Field>{startDateFormatted}</Field>
              </DateBlock>

              <DateBlock>
                <Label>DATA DE ENTREGA</Label>
                <Field>{endDateFormatted}</Field>
              </DateBlock>
            </Dates>
          </Situation>

          <Actions>
            <InformProblem
              disabled={delivered}
              onPress={() => navigation.navigate('InformProblem', { order })}
            >
              <MCIcon name="close-circle-outline" size={25} color="#E74040" />
              <ButtonText>Informar um problema</ButtonText>
            </InformProblem>

            <ViewProblem
              onPress={() => navigation.navigate('ViewProblems', { order })}
            >
              <MCIcon name="information-outline" size={25} color="#E7BA40" />
              <ButtonText>Visualizar problemas</ButtonText>
            </ViewProblem>

            <ConfirmDelivery
              onPress={() => navigation.navigate('ConfirmDelivery', { order })}
            >
              <MCIcon
                name="check-circle-outline"
                size={25}
                color={colors.primary}
              />
              <ButtonText>{textConfirmDelivery}</ButtonText>
            </ConfirmDelivery>
          </Actions>
        </Scroll>
      </Container>
    </>
  );
}

OrderDetail.propTypes = propTypes;
