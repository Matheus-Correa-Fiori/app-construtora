import React, { useEffect } from 'react';
import { View, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './splashStyles';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export const SplashScreen = () => {
    const navigation = useNavigation<SplashScreenNavigationProp>();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('Login');
        }, 2000);

        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <LinearGradient
            colors={['#F5A500', '#FFD580']}
            style={styles.container}
        >
            <Image
                source={require('../../assets/images/logo-construtora.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </LinearGradient>
    );
};

export default SplashScreen;