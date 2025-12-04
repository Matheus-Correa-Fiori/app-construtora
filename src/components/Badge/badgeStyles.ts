import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import tw from 'twrnc';

export const styles = {
    badgeBase: tw`flex-row items-center  py-1 rounded-full gap-1`,
    text: tw`text-sm text-gray-600`,
};

export type BadgeColor = 'yellow' | 'green' | 'blue' | 'purple' | 'gray';

export const badgeColors: Record<BadgeColor, {bg: StyleProp<ViewStyle>; text: StyleProp<TextStyle> }> = {
    yellow: {
        bg: tw`bg-yellow-100`,
        text: tw`text-yellow-700`,
    },
    green: {
        bg: tw`bg-green-100`,
        text: tw`text-green-700`,
    },
    blue: {
        bg: tw`bg-blue-100`,
        text: tw`text-blue-700`,
    },
    purple: {
        bg: tw`bg-purple-100`,
        text: tw`text-purple-700`,
    },
    gray: {
        bg: tw`bg-gray-200`,
        text: tw`text-gray-700`     
    },
};