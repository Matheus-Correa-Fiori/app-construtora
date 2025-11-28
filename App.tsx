import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthInterceptor } from './src/services/api';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  useEffect(() => {
    setAuthInterceptor();
  }, []);

  return(
      <AppNavigator />
  );
}