import React from 'react';
import PropTypes from 'prop-types';

import { MdLens } from 'react-icons/md';
import { Container } from './styles';

import color from '~/styles/colors';

const propTypes = {
  status: PropTypes.string.isRequired,
};

export default function OrderStatus({ status }) {
  let primaryColor;
  let secondaryColor;
  switch (status) {
    case 'ENTREGUE': {
      primaryColor = color.primaryDelivered;
      secondaryColor = color.secondaryDelivered;
      break;
    }
    case 'PENDENTE': {
      primaryColor = color.primaryPending;
      secondaryColor = color.secondaryPending;
      break;
    }
    case 'RETIRADA': {
      primaryColor = color.primaryWithdrawal;
      secondaryColor = color.secondaryWithdrawal;
      break;
    }
    case 'CANCELADA': {
      primaryColor = color.primaryCanceled;
      secondaryColor = color.secondaryCanceled;
      break;
    }
    default:
  }

  return (
    <Container primaryColor={primaryColor} secondaryColor={secondaryColor}>
      <MdLens size={10} color={primaryColor} />
      <strong>{status}</strong>
    </Container>
  );
}

OrderStatus.propTypes = propTypes;
