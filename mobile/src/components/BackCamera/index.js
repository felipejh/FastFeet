import React, { useRef } from 'react';
// import { RNCamera } from 'react-native-camera';
import PropTypes from 'prop-types';
import { Camera, TakePicture, CameraIcon } from './styles';

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default function BackCamera({ navigation }) {
  const cameraRef = useRef();

  async function takePicture() {
    if (cameraRef) {
      const options = {
        quality: 0.5,
        base64: true,
        forceUpOrientation: true,
        fixOrientation: true,
      };

      const data = await cameraRef.current.takePictureAsync(options);

      const formData = new FormData();
      formData.append('file', {
        uri: data.uri,
        name: `Signature${data.uri}.jpg`,
        type: 'image/*',
      });

      navigation.navigate('ConfirmDelivery', {
        imageData: { uri: data.uri, formData },
      });
    }
  }

  return (
    <>
      <Camera ref={cameraRef} captureAudio={false} />

      <TakePicture onPress={takePicture}>
        <CameraIcon />
      </TakePicture>
    </>
  );
}

BackCamera.propTypes = propTypes;
