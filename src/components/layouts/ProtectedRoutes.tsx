// #region IMPORTS -> /////////////////////////////////////
import React, { ReactNode, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '~/core/router/routerType';
import useAuth from '~/hooks/useAuth';
import useStorage from '~/hooks/useStorage';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
const Stack = createNativeStackNavigator<RootStackParamList>();
// #endregion SINGLETON --> /////////////////////////////////

export default function ProtectedRoutes({ children }: IProtectedRoutes) {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Navigation = useNavigation();
    const Auth = useAuth();
    const Storage = useStorage();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await Auth.isAuthenticated();
            const session = await Storage.getSession();

            if (!isAuth) {
                Navigation.navigate('Login');
            } else if (!session.isAccountFinalized) {
                Navigation.navigate('Finalize');
            }
        };

        checkAuth();
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return <Stack.Navigator>{children}</Stack.Navigator>;
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IProtectedRoutes {
    children: ReactNode;
}
// #enderegion IPROPS --> //////////////////////////////////
