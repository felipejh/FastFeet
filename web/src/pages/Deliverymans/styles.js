import styled from 'styled-components';
import { darken } from 'polished';
import color from '~/styles/colors';

export const Container = styled.div`
  max-width: 1440px;
  margin: 60px auto;
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
    width: 142px;
    background: ${color.primary};
    border: 0;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, color.primary)};
    }

    strong {
      font-size: 14px;
      color: #fff;
      margin-left: 5px;
    }
  }
`;

export const SearchContainer = styled.div`
  height: 36px;
  width: 234px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;

  display: flex;
  align-items: center;
  padding: 10px;

  input {
    margin-left: 5px;
    border: none;
    color: #999;

    &::placeholder {
      color: #999;
    }
  }
`;

export const DeliverymanTable = styled.table`
  width: 100%;
  border-spacing: 0px 10px;

  thead th {
    color: #444;
    text-align: left;
    padding: 5px 20px;
  }

  tbody tr {
    background: #fff;
    height: 57px;
  }

  tbody td {
    /* padding: 18px; */
    border: solid 1px #fff;
    border-style: solid none;
    color: #666;
    font-size: 16px;
    padding: 0px 20px;

    img {
      height: 45px;
      width: 45px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 10px;
    }
  }

  th:last-child {
    text-align: center;
  }

  td:first-child {
    border-left-style: solid;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  td:last-child {
    border-right-style: solid;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    text-align: center;
  }
`;
