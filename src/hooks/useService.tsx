// #region IMPORTS -> /////////////////////////////////////
import React from 'react'
import useStorage from './useStorage';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function UseService ({}: IUseService) {
    // #region STATE --> ///////////////////////////////////////
    const storage = useStorage();
    // #endregion STATE --> ////////////////////////////////////
    
    // #region HOOKS --> ///////////////////////////////////////
    const refresh = storage.getRefresh();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const startServiceAsVoid = async <T,>(func: Promise<T>) => {

    }
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return <></>;
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseService {}
// #enderegion IPROPS --> //////////////////////////////////