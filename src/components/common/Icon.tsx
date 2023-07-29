// #region IMPORTS -> /////////////////////////////////////
import React, { useEffect, useState } from 'react';
import { Icon as RootIcon } from '@rneui/themed';
import { EntypoNameType, FeatherNameType, FontistoNameType, IoniconsNameType, OcticonsNameType, ZocialNameType } from '../IconNameTypes';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
type IconType =
    | 'material'
    | 'material-community'
    | 'simple-line-icon'
    | 'zocial'
    | 'font-awesome'
    | 'octicon'
    | 'ionicon'
    | 'foundation'
    | 'evilicon'
    | 'entypo'
    | 'antdesign'
    | 'font-awesome-5'
    | 'feather'
    | 'fontisto';
// #endregion SINGLETON --> /////////////////////////////////

export default function Icon({ name, type, color = '#b2b2b2' }: IIcon) {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return <RootIcon name={name} type={type} color={color} />;
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IIcon {
    type: IconType;
    name: string;
    color?: string;
}
// #enderegion IPROPS --> //////////////////////////////////
