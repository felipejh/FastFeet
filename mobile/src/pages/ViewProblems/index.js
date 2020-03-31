import React, { useState, useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import PropTypes from 'prop-types';

import api from '~/services/api';

import colors from '~/styles/colors';

import {
  Container,
  HeaderBackground,
  ProblemContainer,
  Problem,
  DateProblem,
  DescriptionProblem,
  ListProblems,
  OrderDescription,
} from './styles';

const propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape().isRequired,
};

export default function ViewProblems({ route }) {
  const { order } = route.params;

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      try {
        const response = await api.get(`delivery/${order.id}/problems`);

        if (response.data) {
          const newProblems = response.data.map(p => ({
            ...p,
            dateFormatted: format(parseISO(p.createdAt), 'dd/MM/yyyy', {
              locale: pt,
            }),
          }));

          setProblems(newProblems);
        }
      } catch (err) {
        Alert.alert(
          'Erro',
          'Ocorreu um erro ao buscar os problemas da entrega.'
        );
      }
    }
    loadProblems();
  }, [order]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <HeaderBackground />
      <Container>
        <ProblemContainer>
          <OrderDescription>Encomenda {order.id}</OrderDescription>
          <ListProblems
            data={problems}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Problem>
                <DescriptionProblem>{item.description}</DescriptionProblem>
                <DateProblem>{item.dateFormatted}</DateProblem>
              </Problem>
            )}
          />
        </ProblemContainer>
      </Container>
    </>
  );
}

ViewProblems.propTypes = propTypes;
