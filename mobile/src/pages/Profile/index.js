import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { signOut } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import {
  Container,
  Avatar,
  AvatarLetters,
  Letters,
  Label,
  Field,
  LogoutButton,
} from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  const letters = useMemo(
    () => profile.name.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g),
    [profile]
  );

  const dateFormatted = useMemo(
    () => format(parseISO(profile.created_at), 'dd/MM/yyyy', { locale: pt }),
    [profile]
  );

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        {profile.avatar ? (
          <Avatar source={{ uri: profile.avatar.url }} />
        ) : (
          <AvatarLetters>
            <Letters>{letters}</Letters>
          </AvatarLetters>
        )}

        <Label>Nome completo</Label>
        <Field>{profile.name}</Field>

        <Label>Email</Label>
        <Field>{profile.email}</Field>

        <Label>Data de cadastro</Label>
        <Field>{dateFormatted}</Field>

        <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
      </Container>
    </Background>
  );
}
