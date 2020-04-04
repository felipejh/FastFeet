import styled from 'styled-components';
import { darken } from 'polished';

import color from '~/styles/colors';

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
  margin-top: 15px;
  flex-direction: row;
  text-align: center;
  border-radius: 4px;

  button {
    align-items: center;
    margin: 0 15px;
    justify-content: center;
    height: 36px;
    width: 36px;
    background: ${color.primary};
    border: 0;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, color.primary)};
    }
  }

  strong {
    font-size: 14px;
    color: #444;
    margin-left: 5px;
  }
`;
