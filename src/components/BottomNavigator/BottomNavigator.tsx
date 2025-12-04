import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Home, Bell } from 'lucide-react-native';
import { styles } from './bottomNavigatorStyles';

type Props = {
    currentScreen: 'Dashboard' | 'Notifications';
    onNavigate: (screen: 'Dashboard' | 'Notifications') => void;
};

export const BottomNavigator: React.FC<Props> = ({currentScreen, onNavigate}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                disabled={currentScreen === 'Dashboard'}
                onPress={() => onNavigate('Dashboard')}
                style={currentScreen === 'Dashboard' ? styles.buttonActive : styles.buttonInactive}
            >
                <Home
                    size={28}
                    color={currentScreen === 'Dashboard' ? '#F5A500' : 'gray'}
                />
            </TouchableOpacity>

            <TouchableOpacity
                disabled={currentScreen === 'Notifications'}
                onPress={() => onNavigate('Notifications')}
                style={currentScreen === 'Notifications' ? styles.buttonActive : styles.buttonInactive}
            >
                <Bell
                    size={28}
                    color={currentScreen === 'Notifications' ? '#F5A500' : 'gray'}
                />
            </TouchableOpacity>
        </View>
    );
};