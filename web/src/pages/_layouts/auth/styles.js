import styled from 'styled-components';
import { darken } from 'polished';
import color from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background: ${color.primary};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  div {
    background: #fff;
    width: 360px;
    height: 425px;
    padding: 60px 20px;
    border-radius: 4px;

    form {
      display: flex;
      flex-direction: column;
      margin-top: 30px;

      strong {
        font-weight: bold;
        font-size: 14px;
        color: #444;
        text-align: left;
        margin: 5px 0 10px;
      }

      input {
        border: 1px solid #ddd;
        border-radius: 4px;
        height: 44px;
        color: #000;
        padding: 0 15px;
        margin: 0 0 10px;

        &::placeholder {
          color: #999;
        }
      }

      span {
        color: #de3b3b;
        align-self: flex-start;
        margin: 0 0 10px;
        font-weight: bold;
      }

      button {
        margin: 5px 0 0;
        height: 44px;
        background: ${color.primary};
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.03, color.primary)};
        }
      }

      a {
        color: #fff;
        margin-top: 15px;
        font-size: 16px;
        opacity: 0.8;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
`;
