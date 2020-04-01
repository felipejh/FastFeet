import styled from 'styled-components';
import { darken } from 'polished';
import { Input } from '@rocketseat/unform';
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
  height: 350px;
  width: 900px;

  display: flex;

  form {
    div {
      display: flex;
    }
    label {
      font-size: 14px;
      font-weight: bold;
      color: #444;
      margin: 20px 20px 0 0;
      float: left;
    }

    strong {
      display: block;
    }

    input {
      height: 45px;
      margin-bottom: 5px;
      padding: 12px 16px;
      border-radius: 4px;
      border: 1px solid #ddd;
      font-size: 16px;
      color: #444;
      transition: border-color 0.2s;

      &:focus {
        border: 2px solid #2684ff;
      }
    }

    span {
      color: #f00;
      align-self: flex-start;
      margin: 20px 5px;
      font-weight: bold;
    }
  }
`;

export const InputName = styled(Input)`
  width: 840px;
`;

export const InputStreet = styled(Input)`
  width: 515px;
`;

export const InputNumber = styled(Input)`
  width: 150px;
`;

export const InputComplement = styled(Input)`
  width: 140px;
`;

export const InputCity = styled(Input)`
  width: 270px;
`;
export const InputState = styled(Input)`
  width: 270px;
`;
export const InputCep = styled(Input)`
  width: 270px;
`;
