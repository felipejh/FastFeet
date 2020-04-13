import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '~/components/Button';

import colors from '~/styles/colors';

export const HeaderBackground = styled.View`
  background: ${colors.primary};
  height: 100px;
`;

export const ContainerImage = styled.View`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  margin: -80px 20px 5px;
  /* padding: 10px 15px 0; */
  flex: 1;
`;

export const Signature = styled.Image.attrs({
  // resizeMode: 'contain',
})`
  border-radius: 4px;
  width: 100%;
  height: 100%;
`;

export const SubmitButton = styled(Button)`
  margin-top: 40px;
  background: ${colors.primary};
  margin: 15px 20px;
`;

export const TakePicture = styled.TouchableOpacity`
  background: rgba(0, 0, 0, 0.5);
  width: 61px;
  height: 61px;
  border-radius: 61px;
  position: absolute;
  margin-bottom: 20px;

  align-items: center;
  justify-content: center;
  align-self: center;
  bottom: 0;
`;

export const CameraIcon = styled(Icon).attrs({
  size: 35,
  color: '#fff',
  name: 'photo-camera',
})``;
