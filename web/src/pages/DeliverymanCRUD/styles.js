import styled from 'styled-components';
import { darken } from 'polished';
import color from '~/styles/colors';

export const Container = styled.div`
  max-width: 900px;
  margin: 60px auto;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const PageTitle = styled.strong`
  font-size: 24px;
  font-weight: bold;
  color: #444;
`;

export const PageControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 112px;
    background: #cccccc;
    border: 0;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, color.primary)};
    }

    & + button {
      margin-left: 10px;
      background: ${color.primary};
    }

    strong {
      font-size: 14px;
      color: #fff;
      margin-left: 5px;
    }
  }
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  margin: 25px auto;
  height: 401px;

  form {
    display: flex;
    flex-direction: column;

    label {
      font-size: 14px;
      font-weight: bold;
      color: #444;
      margin: 15px 15px 0px;
    }

    input {
      width: 100%;
      height: 45px;
      margin: 5px 15px 15px;
      padding: 12px 16px;
      border-radius: 4px;
      border: 1px solid #ddd;
      font-size: 16px;
      color: #444;
      transition: border-color 0.2s;
    }

    input:focus {
      border: 2px solid #2684ff;
    }

    span {
      color: #f00;
      align-self: flex-start;
      margin: 0px 15px;
      font-weight: bold;
    }
  }
`;
