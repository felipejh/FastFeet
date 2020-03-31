import styled from 'styled-components/native';
import colors from '~/styles/colors';

export const Container = styled.View``;

export const TimelineContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 5px;
`;

export const LabelsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
`;

export const Waiting = styled.View`
  background: ${colors.primary};
  border: 1px solid ${colors.primary};
  width: 9px;
  height: 9px;
  border-radius: 4px;
`;

export const Line = styled.View`
  background: ${colors.primary};
  height: 1px;
  flex: 1;
`;

export const Withdrawn = styled.View`
  background: ${props => (props.isTrue ? colors.primary : '#fff')};
  border: 1px solid ${colors.primary};
  width: 9px;
  height: 9px;
  border-radius: 4px;
`;

export const Delivered = styled.View`
  background: ${props => (props.isTrue ? colors.primary : '#fff')};
  border: 1px solid ${colors.primary};
  width: 9px;
  height: 9px;
  border-radius: 4px;
`;

export const Label = styled.Text`
  font-size: 8px;
  color: #999;
  text-align: center;
`;
