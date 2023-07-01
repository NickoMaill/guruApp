import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './routerType';
import Home from '~/screens/Home';
import Login from '~/screens/Login';
import Setup from '~/screens/Setup';
import User from '~/screens/User';
import Layout from '~/components/layouts/Layout';
import Info from '~/screens/Info';

export default function Router() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: 'transparent' } }}>
            <Stack.Navigator screenOptions={{ presentation: 'modal' }} initialRouteName="Home">
                <Stack.Group screenOptions={{ headerShown: false, gestureEnabled: false }}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Setup" component={Setup} />
                    <Stack.Screen name="User" component={User} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal', animation: 'slide_from_bottom', headerShown: false }}>
                    <Stack.Screen name="Info" component={Info} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
