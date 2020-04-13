import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Camera = styled(RNCamera).attrs({
  type: 'RNCamera.Constants.Type.back',
  flashMode: 'RNCamera.Constants.FlashMode.off',
})`
  flex: 1;
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
