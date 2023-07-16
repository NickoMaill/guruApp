// #region IMPORTS -> /////////////////////////////////////
import React from 'react'
import useStorage from './useStorage';
import { useAppDispatch, useAppSelector } from '~/store/storeHooks';
import { sessionSlice } from '~/store/AppContext/session';
import userServices from '~/services/userServices';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useAuth () {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const storage = useStorage();
    const Store = useAppDispatch();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const isAuthenticated = async (): Promise<boolean> => {
        const access = await storage.getSession();
        if (!access) {
            return false;
        }

        Store(sessionSlice.actions.setSession(access));
        return true;
    }
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { isAuthenticated };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseAuth {
    isAuthenticated: () => Promise<boolean>
}
// #enderegion IPROPS --> //////////////////////////////////