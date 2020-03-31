import styled from 'styled-components';

export const Container = styled.div`
  background: ${props => props.secondaryColor};
  display: flex;
  align-items: center;
  border-radius: 25px;
  padding: 0 8px;
  height: 25px;
  width: min-content;

  strong {
    color: ${props => props.primaryColor};
    font-size: 14px;
    margin-left: 5px;
  }
`;
