// #region IMPORTS -> /////////////////////////////////////
import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { Text } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import configManager from '~/manager/configManager';
import useAuth from '~/hooks/useAuth';
import useStorage from '~/hooks/useStorage';
import useNavigation from '~/hooks/useNavigation';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Splash() {
    const [isSplashEnded, setIsSplashEnded] = useState<boolean>(false);
    const Nav = useNavigation();
    const Auth = useAuth();
    const Storage = useStorage();

    useEffect(() => {
        if (isSplashEnded) {
            Nav.goTo('Home');
        }
    }, [isSplashEnded]);

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 40, position: 'absolute', top: configManager.dimension.height / 4 }}>Guru Recipes App</Text>
            <LottieView source={require('../assets/splash.json')} speed={1} autoPlay loop={false} onAnimationFinish={(e) => setIsSplashEnded(configManager.isIos() ? !e : e)} />
        </SafeAreaView>
    );
}

// #region IPROPS -->  /////////////////////////////////////
interface ISplash {}
// #enderegion IPROPS --> //////////////////////////////////
