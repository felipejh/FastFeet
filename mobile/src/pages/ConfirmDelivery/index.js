import React from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import confirmDelivery from '~/assets/confirmDelivery.png';
import api from '~/services/api';

import {
  ContainerImage,
  HeaderBackground,
  Signature,
  SubmitButton,
  TakePicture,
  CameraIcon,
} from './styles';

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape(),
  }).isRequired,
};

export default function ConfirmDelivery({ navigation, route }) {
  const deliveryman = useSelector(state => state.user.profile);

  const { order } = route.params;

  let uri;
  if (order.end_date) {
    uri = order.signature.url;
  }

  if (route.params.imageData) {
    uri = route.params.imageData.uri;
  }

  const formData = route.params.imageData
    ? route.params.imageData.formData
    : null;

  function takePicture() {
    navigation.navigate('Camera');
  }

  async function handleSubmit() {
    if (!uri) {
      Alert.alert('Atenção', 'É obrigatório uma foto da assinatura.');
    } else {
      try {
        await api.put(`deliveryman/${deliveryman.id}/finish`, formData, {
          params: {
            delivery_id: order.id,
          },
        });
        Alert.alert('Sucesso!', 'Entrega confirmada com sucesso!', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('Dashboard', { visiblePending: true }),
          },
        ]);
      } catch (err) {
        Alert.alert('Erro', 'Ocorreu um erro ao confirmar a entrega.');
      }
    }
  }

  return (
    <>
      <HeaderBackground />
      <ContainerImage>
        {uri ? (
          <Signature source={{ uri }} />
        ) : (
          <Signature source={confirmDelivery} />
        )}
        {!order.end_date && (
          <TakePicture onPress={takePicture}>
            <CameraIcon />
          </TakePicture>
        )}
      </ContainerImage>
      {!order.end_date && (
        <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
      )}
    </>
  );
}

ConfirmDelivery.propTypes = propTypes;
