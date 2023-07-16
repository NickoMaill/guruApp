// #region IMPORTS -> /////////////////////////////////////
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode, useState } from 'react'
import { UserLoginResponse } from '~/data/model/userApiModel';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function ProtectedRoutes ({ children, session }: IProtectedRoutes) {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const navigation = useNavigation();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    if (!session) {
        navigation.navigate("Login");
    } else {
        return (
            <>
                {children}
            </>
        );
    }
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IProtectedRoutes {
    children: ReactNode;
    session: UserLoginResponse;
}
// #enderegion IPROPS --> //////////////////////////////////