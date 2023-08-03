import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './routerType';
import Home from '~/screens/Home';
import Login from '~/screens/Login';
import Setup from '~/screens/Setup';
import User from '~/screens/User';
import Info from '~/screens/Info';
import Splash from '~/screens/Splash';
import Finalize from '~/screens/Finalize';
import { Text } from '@rneui/themed';
import routerConfig from './routerConfig';

export default function Router() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <NavigationContainer linking={routerConfig.routeLinks} fallback={<Text>Loading...</Text>} theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: 'transparent' } }}>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Group screenOptions={{ headerShown: false, gestureEnabled: false }}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="User" component={User} />
                    <Stack.Screen name="Setup" component={Setup} />
                    <Stack.Screen name="Splash" component={Splash} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Finalize" component={Finalize} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal', animation: 'slide_from_bottom', headerShown: false }}>
                    <Stack.Screen name="Info" component={Info} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
