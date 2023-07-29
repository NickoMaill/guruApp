// #region IMPORTS -> /////////////////////////////////////
import { Button } from '@rneui/themed';
import React, { useEffect } from 'react';
import Layout from '~/components/layouts/Layout';
import useUserService from '~/hooks/services/useUserService';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Setup() {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const UserService = useUserService();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {}, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Layout headerShown>
            <Button onPress={async () => await UserService.logout()}>Se déconnecter</Button>
        </Layout>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ISetup {}
// #enderegion IPROPS --> //////////////////////////////////
