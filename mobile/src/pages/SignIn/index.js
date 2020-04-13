import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';
import { Container, Form, UserId, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [deliverymanId, setDeliverymanId] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(deliverymanId));
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <UserId
          icon="person-outline"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          value={deliverymanId}
          onChangeText={setDeliverymanId}
          onSubmitEditing={handleSubmit}
        />
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
