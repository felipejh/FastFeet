import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import { Container } from './styles';

const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default function ModalProblems({
  title,
  description,
  isOpen,
  onRequestClose,
}) {
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

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={styleModal}>
      <Container>
        <div>
          <strong>{title}</strong>
          <p>{description}</p>
        </div>
      </Container>
    </Modal>
  );
}

ModalProblems.propTypes = propTypes;
