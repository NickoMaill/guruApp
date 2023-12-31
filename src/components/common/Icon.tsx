// #region IMPORTS -> /////////////////////////////////////
import React from 'react';
import { Icon as RootIcon } from '@rneui/themed';
import { TextStyle, ViewStyle } from 'react-native';
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

export default function Icon({ name, type, style, color = '#b2b2b2' }: IIcon) {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return <RootIcon style={style} name={name} type={type} color={color} />;
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IIcon {
    type: IconType;
    name: string;
    color?: string;
    style?: ViewStyle | TextStyle;
}
// #enderegion IPROPS --> //////////////////////////////////
