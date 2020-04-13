import { Platform } from 'react-native';
import styled from 'styled-components/native';

import colors from '~/styles/colors';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  background: ${colors.primary};
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const UserId = styled(Input)`
  background: #fff;
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: #82bf18;
`;
