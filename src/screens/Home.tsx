// #region IMPORTS -> /////////////////////////////////////
import React, { useEffect, useState } from 'react';
import BouncerLoader from '~/components/common/BouncerLoader';
import FabGroup from '~/components/home/FabGroup';
import Layout from '~/components/layouts/Layout';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Home() {
    // #region STATE --> ///////////////////////////////////////
    const [isLoading, _setIsLoading] = useState<boolean>(true);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////

    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {}, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Layout headerShown>
            {isLoading ? <BouncerLoader /> : <></>}
            <FabGroup />
        </Layout>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// interface IHome {}
// #enderegion IPROPS --> //////////////////////////////////
