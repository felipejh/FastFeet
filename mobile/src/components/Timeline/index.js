import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  TimelineContainer,
  LabelsContainer,
  Waiting,
  Line,
  Withdrawn,
  Delivered,
  Label,
} from './styles';

const propTypes = {
  status: PropTypes.string.isRequired,
};

export default function Timeline({ status }) {
  return (
    <Container>
      <TimelineContainer>
        <Waiting />
        <Line />
        <Withdrawn
          isTrue={!!(status === 'RETIRADA' || status === 'ENTREGUE')}
        />
        <Line />
        <Delivered isTrue={!!(status === 'ENTREGUE')} />
      </TimelineContainer>

      <LabelsContainer>
        <Label>Aguardando{'\n'}retirada</Label>
        <Label>Retirada</Label>
        <Label>Entregue</Label>
      </LabelsContainer>
    </Container>
  );
}

Timeline.propTypes = propTypes;
