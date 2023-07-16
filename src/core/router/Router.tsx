import { DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './routerType';
import Home from '~/screens/Home';
import Login from '~/screens/Login';
import Setup from '~/screens/Setup';
import User from '~/screens/User';
import Layout from '~/components/layouts/Layout';
import Info from '~/screens/Info';
import Splash from '~/screens/Splash';
import Finalize from '~/screens/Finalize';
import ProtectedRoutes from '~/components/layouts/ProtectedRoutes';
import { useAppSelector } from '~/store/storeHooks';
import { selectSession } from '~/store/AppContext/session';

export default function Router() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const session = useAppSelector((state) => state.session.value);
    return (
        <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: 'transparent' } }}>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Group screenOptions={{ headerShown: false, gestureEnabled: false }}>
                    {session ? (
                        !session.isAccountFinalized ? (
                            <Stack.Screen name="Finalize" component={Finalize} />
                        ) : (
                            <>
                                <Stack.Screen name="Home" component={Home} />
                                <Stack.Screen name="User" component={User} />
                                <Stack.Screen name="Setup" component={Setup} />
                            </>
                        )
                    ) : (
                        <>
                            <Stack.Screen name="Splash" component={Splash} />
                            <Stack.Screen name="Login" component={Login} />
                        </>
                    )}
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal', animation: 'slide_from_bottom', headerShown: false }}>
                    <Stack.Screen name="Info" component={Info} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
