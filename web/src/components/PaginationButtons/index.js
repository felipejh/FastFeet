import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import PropTypes from 'prop-types';

import { Container } from './styles';

const propTypes = {
  page: PropTypes.func.isRequired,
  renderPrev: PropTypes.bool.isRequired,
  renderNext: PropTypes.bool.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
};

export default function PaginationButtons({
  page,
  renderPrev,
  renderNext,
  handlePrevPage,
  handleNextPage,
}) {
  return (
    <Container>
      {renderPrev && (
        <button type="button" onClick={handlePrevPage}>
          <MdNavigateBefore size={30} color="#fff" />
        </button>
      )}

      <strong>Página {page}</strong>
      {renderNext && (
        <button type="button" onClick={handleNextPage}>
          <MdNavigateNext size={30} color="#fff" />
        </button>
      )}
    </Container>
  );
}

PaginationButtons.propTypes = propTypes;
