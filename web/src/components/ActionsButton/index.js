import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Badge,
  ActionList,
  MdMore,
  MdEye,
  MdCustomEdit,
  MdDelete,
} from './styles';

const propTypes = {
  view: PropTypes.bool,
  edit: PropTypes.bool,
  remove: PropTypes.bool,
  cancel: PropTypes.bool,
  actionView: PropTypes.func,
  actionEdit: PropTypes.func,
  actionDelete: PropTypes.func,
  actionCancel: PropTypes.func,
};

const defaultProps = {
  view: false,
  edit: false,
  remove: false,
  cancel: false,
  actionView: null,
  actionEdit: null,
  actionDelete: null,
  actionCancel: null,
};

export default function ActionsButton({
  view,
  edit,
  remove,
  cancel,
  actionView,
  actionEdit,
  actionDelete,
  actionCancel,
}) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible}>
        <MdMore />
      </Badge>

      <ActionList visible={visible} cancel={cancel}>
        {view && (
          <div>
            <MdEye />
            <button type="button" onClick={actionView}>
              Visualizar
            </button>
          </div>
        )}
        {edit && (
          <div>
            <MdCustomEdit />
            <button type="button" onClick={actionEdit}>
              Editar
            </button>
          </div>
        )}
        {remove && (
          <div>
            <MdDelete />
            <button type="button" onClick={actionDelete}>
              Excluir
            </button>
          </div>
        )}
        {cancel && (
          <div>
            <MdDelete />
            <button type="button" onClick={actionCancel}>
              Cancelar encomenda
            </button>
          </div>
        )}
      </ActionList>
    </Container>
  );
}

ActionsButton.propTypes = propTypes;

ActionsButton.defaultProps = defaultProps;
