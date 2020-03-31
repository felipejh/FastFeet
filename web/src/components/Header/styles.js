import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 14400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    div {
      display: flex;
      align-items: center;
      border-right: 1px solid #ddd;
      margin-right: 30px;
      padding-right: 30px;

      img {
        height: 32px;
        width: 135px;
      }
    }

    a {
      font-weight: bold;
      color: #999;
      margin-right: 21px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const PageLink = styled(NavLink).attrs({
  activeStyle: { color: '#444' },
})``;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: flex;
      color: #666;
      font-size: 14px;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 14px;
      color: #de3b3b;
    }
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
