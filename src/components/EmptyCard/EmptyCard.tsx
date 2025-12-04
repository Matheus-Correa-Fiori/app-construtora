import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './emptyCardStyles';

interface EmptyCardProps {
    message: string;
}

export function EmptyCard({message}: EmptyCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}