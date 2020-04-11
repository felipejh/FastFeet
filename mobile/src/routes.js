import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import HeaderBackground from '~/components/HeaderBackground';
import BackCamera from '~/components/BackCamera';

import colors from '~/styles/colors';

import SignIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';
import OrderDetail from '~/pages/OrderDetail';
import InformProblem from '~/pages/InformProblem';
import ViewProblems from '~/pages/ViewProblems';
import ConfirmDelivery from '~/pages/ConfirmDelivery';
import Profile from '~/pages/Profile';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function CameraStack() {
  return (
    <Stack.Navigator mode="modal" tabBarVisible="false">
      <Stack.Screen
        name="BackCamera"
        component={BackCamera}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

function DashboardStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: false,
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={() => ({
          headerTitle: '',
          headerTransparent: true,
        })}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={({ navigation }) => ({
          headerBackground: () => <HeaderBackground />,
          headerTitle: 'Detalhe da encomenda',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={25} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="InformProblem"
        component={InformProblem}
        options={({ navigation }) => ({
          headerBackground: () => <HeaderBackground />,
          headerTitle: 'Informar problema',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ViewProblems"
        component={ViewProblems}
        options={({ navigation }) => ({
          headerBackground: () => <HeaderBackground />,
          headerTitle: 'Visualizar problemas',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ConfirmDelivery"
        component={ConfirmDelivery}
        options={({ navigation }) => ({
          headerBackground: () => <HeaderBackground />,
          headerTitle: 'Confirmar entrega',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Camera"
        component={CameraStack}
        options={({ navigation }) => ({
          headerBackground: () => <HeaderBackground />,
          headerTitle: 'Confirmar entrega',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default function createRouter(isSigned = false) {
  console.tron.log(`isSigned: ${isSigned}`);
  return !isSigned ? (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  ) : (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: '#999',
        style: {
          backgroundColor: '#fff',
        },
        keyboardHidesTabBar: true,
      }}
    >
      <Tabs.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Entregas',
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => (
            <Icon name="reorder" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu perfil',
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle" size={30} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
