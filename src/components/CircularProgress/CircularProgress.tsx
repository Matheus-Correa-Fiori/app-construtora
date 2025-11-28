import React from "react";
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { styles } from './circularProgressStyles';

interface CircularProgressProps {
    size: number;
    strokeWidth: number;
    progress: number;
    color?: string;
    backgroundColor?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    size,
    strokeWidth,
    progress,
    color = '#4CAF50',
    backgroundColor = '#E6E6E6',
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <View style={{width: size, height: size}}>
            <Svg width={size} height={size}>
                <Circle
                    stroke={backgroundColor}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    stroke={color}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    originX={size / 2}
                    originY={size / 2}
                />
            </Svg>

            <View style={[styles.container, {width: size, height: size, position: 'absolute', top: 0, left: 0}]}>
                <Text style={styles.text}>{progress.toFixed(0)}%</Text>
            </View>
        </View>
    );
};