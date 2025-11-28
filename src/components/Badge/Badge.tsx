import React from 'react';
import { View, Text } from 'react-native';
import { Hammer, CheckCircle, FileSignature, Construction} from 'lucide-react-native';
import { styles } from './badgeStyles'

type BadgeProps = {
    label: string;
};

const badgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
        case 'em obras':
            return { color: 'yellow', Icon: Hammer };
        case 'entregue':
            return { color: 'green', Icon: CheckCircle };
        case 'contratação':
            return { color: 'blue', Icon: FileSignature };
        case 'entrega de chaves':
            return { color: 'purple', Icon: CheckCircle };
        default:
            return { color: 'gray', Icon: Construction };
    }
};

export const Badge: React.FC<BadgeProps> = ({ label }) => {
    const {color, Icon} = badgeStyle(label);

    return (
        <View style={styles.badgeBase}>
            <Icon size={14} />
            <Text style={styles.text}>{label} executados</Text>
        </View>
    );
};