import React from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = {
    route: RouteProp<RootStackParamList, "WebView">;
};

const WebViewScreen = ({route}: Props) => {
    const {url} = route.params;

    return (
        <View style={{flex: 1}}>
            <WebView
                source={{uri: url}}
                startInLoadingState
                renderLoading={() => (
                    <ActivityIndicator size="large" style={{marginTop: 20}} />
                )}
            />
        </View>
    );
};

export default WebViewScreen;