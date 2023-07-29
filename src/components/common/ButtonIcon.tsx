// #region IMPORTS -> /////////////////////////////////////
import { Icon } from '@rneui/themed';
import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function ButtonIcon({ onPress, iconName, iconFamily, iconSize, iconColor, style }: IButtonIcon) {
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
        <TouchableOpacity style={style} onPress={onPress}>
            <Icon color={iconColor} name={iconName} type={iconFamily} size={iconSize} />
        </TouchableOpacity>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IButtonIcon {
    onPress: () => void;
    iconName: string;
    iconFamily?: string;
    iconSize?: number;
    iconColor?: string;
    style?: StyleProp<ViewStyle>;
}
// #enderegion IPROPS --> //////////////////////////////////
