import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import './config/ReactotronConfig';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import Background from '~/components/Background';
import colors from '~/styles/colors';

import { store, persistor } from './store';

import App from './App';

export default function Index() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Background>
            <StatusBar
              barStyle="light-content"
              backgroundColor={colors.primary}
            />
            <App />
          </Background>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
