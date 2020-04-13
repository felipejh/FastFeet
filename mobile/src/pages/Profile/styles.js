import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  margin: 40px 30px;
  flex: 1;
`;

export const Avatar = styled.Image`
  width: 136px;
  height: 136px;
  border-radius: 68px;
  align-self: center;
  margin: 30px 0;
`;

export const AvatarLetters = styled.View`
  width: 136px;
  height: 136px;
  border-radius: 68px;
  align-items: center;
  align-self: center;
  justify-content: center;
  background: #f4effc;
`;

export const Letters = styled.Text`
  font-size: 31px;
  color: #a28fd0;
`;

export const Label = styled.Text`
  font-size: 12px;
  color: #666;
  margin-top: 20px;
`;
export const Field = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
  margin-top: 5px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 40px;
  background: #e74040;
`;
