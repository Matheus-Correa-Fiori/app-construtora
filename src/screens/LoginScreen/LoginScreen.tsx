import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { styles } from './loginStyles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/AppNavigator'
import { login as loginApi } from '../../services/authService'
import { setAuthInterceptor } from '../../services/api'
import { OneSignal } from 'react-native-onesignal'
import { Eye, EyeOff } from "lucide-react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppHeader from '../../components/AppHeader/AppHeader'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)

  const initializeOneSignal = (userEmail: string) => {
    OneSignal.Debug.setLogLevel(0)
    OneSignal.initialize('c9702e98-fdd5-4f46-afa9-d5bd6c0d54f6')

    OneSignal.login(userEmail)

    OneSignal.Notifications.requestPermission(true)

    OneSignal.Notifications.addEventListener('foregroundWillDisplay', event => {
      event.preventDefault()
      event.getNotification().display()
    })

    OneSignal.User.addEmail(userEmail)
  }

  const login = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos')
      return
    }

    try {
      setLoading(true)

      const response = await loginApi({
        usuario: email,
        senha: password
      })

      const token = response.access_token

      await AsyncStorage.setItem('authToken', token)
      setAuthInterceptor(token)

      initializeOneSignal(email)

      navigation.replace('Dashboard')
    } catch (error: any) {
      console.error(error)
      Alert.alert('Erro', 'Usuário ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  const recovery = () => {
    navigation.navigate('Recovery')
  }

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.content}>
        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.label}>Usuário</Text>
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.password}>
          <Text style={styles.label}>Senha</Text>
          <View>
            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.showPassword}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color="#555" />
              ) : (
                <Eye size={20} color="#555" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={recovery}>
          <Text style={styles.link}>Esqueci a senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={login} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen