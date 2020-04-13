import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';

import PropTypes from 'prop-types';

import api from '~/services/api';

import colors from '~/styles/colors';

import {
  Container,
  HeaderBackground,
  InputProblem,
  SubmitButton,
} from './styles';

const propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape().isRequired,
};

export default function InformProblem({ navigation, route }) {
  const { order } = route.params;

  const [description, setDescription] = useState('');

  async function handleSubmit() {
    try {
      await api.post(`delivery/${order.id}/problems`, {
        description,
      });
      Alert.alert('Sucesso!', 'Problema cadastrado com sucesso.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu um erro ao gravar o problema.');
    }
  }

  return (
    <>
      <HeaderBackground />
      <Container>
        <InputProblem
          placeholder="Insira aqui o problema que ocorreu na entrega."
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
      </Container>
    </>
  );
}

InformProblem.propTypes = propTypes;
