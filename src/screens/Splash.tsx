// #region IMPORTS -> /////////////////////////////////////
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Text } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import configManager from '~/manager/configManager';
import { useNavigation } from '@react-navigation/native';
import useAuth from '~/hooks/useAuth';
import { useAppSelector } from '~/store/storeHooks';
import { sessionSlice } from '~/store/AppContext/session';
import useStorage from '~/hooks/useStorage';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Splash({}: ISplash) {
    // #region STATE --> ///////////////////////////////////////
    const [isSplashEnded, setIsSplashEnded] = useState<boolean>(false);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const navigation = useNavigation();
    const storage = useStorage();
    const auth = useAuth();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const nextStep = async () => {
        const isAuthenticated = await auth.isAuthenticated();
        if (!isAuthenticated) {
            navigation.navigate('Login');
            return;
        }

        const session = await storage.getSession();
        if (session) {
            if (!session.isAccountFinalized) {
                navigation.navigate('Finalize');
                return;
            } else {
                // navigation.navigate('Home');
                return;
            }
        }

    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        // console.log(isSplashEnded);
        if (isSplashEnded) {
            nextStep();
        }
    }, [isSplashEnded]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 40, position: 'absolute', top: configManager.dimension.height / 4 }}>Guru Recipes App</Text>
            <LottieView source={require('../assets/splash.json')} speed={1} autoPlay loop={false} onAnimationFinish={(e) => setIsSplashEnded(configManager.isIos() ? !e : true)} />
        </SafeAreaView>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ISplash {}
// #enderegion IPROPS --> //////////////////////////////////
