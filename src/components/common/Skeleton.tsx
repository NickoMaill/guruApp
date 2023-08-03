// #region IMPORTS -> /////////////////////////////////////
import React from 'react';
import { Skeleton as RootSkeleton } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, ViewStyle } from 'react-native';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Skeleton({ width, height, style, circle = false, rounded = false }: ISkeleton) {
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
        <RootSkeleton
            animation="wave"
            shouldRasterizeIOS
            style={[{ margin: 7 }, style, rounded && { borderRadius: 50 }]}
            width={width}
            height={height}
            circle={circle}
            LinearGradientComponent={LinearGradient}
        />
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ISkeleton {
    style?: StyleProp<ViewStyle>;
    width?: number;
    height?: number;
    circle?: boolean;
    rounded?: boolean;
}
// #enderegion IPROPS --> //////////////////////////////////
