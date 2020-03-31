import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1440px;
  margin: 60px auto;
`;

export const PageTitle = styled.strong`
  font-size: 24px;
  font-weight: bold;
  color: #444;
`;

export const DeliverymanTable = styled.table`
  width: 100%;
  border-spacing: 0px 10px;
  text-align: justify;

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

    /* & + td {
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    } */
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

export const ColumnId = styled.td`
  width: 50px;
`;
export const ColumnDescription = styled.td`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const ColumnActions = styled.td`
  width: 50px;
`;
