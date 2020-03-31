import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/images/logo.svg';

import { Container, PageLink, Content, Profile } from './styles';

export default function Header() {
  // const profile = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  function handleSingOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <div>
            <img src={logo} alt="FastFeet" />
          </div>
          <PageLink to="/orders">ENCOMENDAS</PageLink>
          <PageLink to="/deliverymans">ENTREGADORES</PageLink>
          <PageLink to="/recipients">DESTINATÁRIOS</PageLink>
          <PageLink to="/problems">PROBLEMAS</PageLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Admin FastFeet</strong>
              <Link to="/" onClick={handleSingOut}>
                sair do sistema
              </Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
