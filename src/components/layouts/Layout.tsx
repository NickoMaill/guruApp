// #region IMPORTS -> /////////////////////////////////////
import React, { ReactNode } from 'react';
import Header from './Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import configManager from '~/manager/configManager';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Layout({ children, headerShown = false }: ILayout) {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginTop: configManager.isIos() ? -60 : 0 }}>
            {headerShown && <Header />}
            {children}
        </SafeAreaView>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ILayout {
    children: ReactNode;
    headerShown?: boolean;
}
// #enderegion IPROPS --> //////////////////////////////////
