// #region IMPORTS -> /////////////////////////////////////
import { BottomSheet, Icon } from '@rneui/themed';
import React, { ReactNode, useState } from 'react';
import { PanResponderGestureState, TouchableOpacity, View } from 'react-native';
import configManager from '~/manager/configManager';
import GestureRecognizer from 'react-native-swipe-gestures';

// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function BottomModal({ isVisible, children, onPressClose, overflow, onGestureClose }: IBottomModal) {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const onSwipe = (gestureState: PanResponderGestureState) => {
        if (gestureState.dy > 200 && gestureState.vy >= 4) {
            onGestureClose(true);
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <GestureRecognizer onSwipeDown={onSwipe}>
            <BottomSheet containerStyle={{ overflow }} isVisible={isVisible}>
                <View
                    style={{
                        backgroundColor: '#ffffff',
                        borderTopStartRadius: 20,
                        borderTopEndRadius: 20,
                        height: configManager.isIos() ? configManager.dimension.height / 1.07 : configManager.dimension.height / 1.033,
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <TouchableOpacity style={{ top: 0, left: 0, position: 'absolute', padding: configManager.isIos() ? 15 : 0 }} onPress={() => onPressClose()}>
                        <Icon color="tomato" size={40} name="close" />
                    </TouchableOpacity>
                    {children}
                </View>
            </BottomSheet>
        </GestureRecognizer>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IBottomModal {
    isVisible: boolean;
    children: ReactNode;
    onPressClose: () => void;
    overflow?: 'hidden' | 'visible' | 'scroll';
    onGestureClose?: (isClose: boolean) => void;
}
// #enderegion IPROPS --> //////////////////////////////////
