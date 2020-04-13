import styled from 'styled-components/native';

import Button from '~/components/Button';
import colors from '~/styles/colors';

export const HeaderBackground = styled.View`
  background: ${colors.primary};
  height: 100px;
`;

export const Container = styled.SafeAreaView`
  background: #fff;
  flex: 1;
  z-index: 1;
`;

export const InputProblem = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  font-size: 16px;
  height: 250px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  margin: -80px 20px 5px;
  padding: 10px 15px 0;
`;

export const SubmitButton = styled(Button)`
  margin-top: 40px;
  background: ${colors.primary};
  margin: 15px 20px;
`;
