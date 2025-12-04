import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { styles } from './recoveryStyles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/AppNavigator'
import AppHeader from '../../components/AppHeader/AppHeader'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Recovery'>

const RecoveryScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [email, setEmail] = useState('')

    const recovery = () => {
        if (email) {
            Alert.alert('Redefinição enviada', 'Confira seu e-mail para redefinir a senha.')
            navigation.goBack()
        } else {
            Alert.alert('Erro', 'Informe seu e-mail')
        }
    }

    return (
        <View style={styles.container}>
            <AppHeader />
            <View style={styles.content}>
                <Text style={styles.title}>Recuperar Senha</Text>
                <Text style={styles.label}>Digite seu e-mail</Text>
                <TextInput
                    placeholder="exemplo@email.com"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TouchableOpacity style={styles.button} onPress={recovery}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RecoveryScreen