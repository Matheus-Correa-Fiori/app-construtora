import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Contrato } from '../types/Contrato'
import { SplashScreen } from '../screens/SplashScreen/SplashScreen'
import { NotificationsScreen } from '../screens/NotificationsScreen/NotificationsScreen'
import LoginScreen from '../screens/LoginScreen/LoginScreen'
import DashboardScreen from '../screens/DashboardScreen/DashboardScreen'
import DetalhesScreen from '../screens/DetalhesScreen/DetalhesScreen'
import BoletoScreen from '../screens/BoletoScreen/BoletoScreen'
import RecoveryScreen from '../screens/RecoveryScreen/RecoveryScreen'
import GaleriaScreen from '../screens/GaleriaScreen/GaleriaScreen'
import WebViewScreen from '../screens/WebViewScreen/WebViewScreen'

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Dashboard: undefined;
  Detalhes: {
    idEmpreendimento: number;
    contrato?: Contrato;
  };
  Boleto: {codigoContrato: number; codigoParcela: number};
  Galeria: {idEmpreendimento: number};
  Recovery: undefined;
  Notifications: undefined;
  WebView: {url: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} />
      <Stack.Screen name="Boleto" component={BoletoScreen} />
      <Stack.Screen name="Recovery" component={RecoveryScreen} />
      <Stack.Screen name="Galeria" component={GaleriaScreen} />
      <Stack.Screen name="WebView" component={WebViewScreen} options={{headerShown: true, title: "Visualizar"}}/>
    </Stack.Navigator>
  </NavigationContainer>
)

export default AppNavigator
