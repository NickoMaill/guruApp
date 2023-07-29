// #region IMPORTS -> /////////////////////////////////////
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming, interpolate } from 'react-native-reanimated';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function BouncerLoader({}: IBouncerLoader) {
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
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <Ring delay={0} />
            <Ring delay={1000} />
            <Ring delay={2000} />
            <Ring delay={3000} />
        </View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IBouncerLoader {}
// #enderegion IPROPS --> //////////////////////////////////

function Ring({ delay }) {
    const ring = useSharedValue(0);
    const ringStyle = useAnimatedStyle(() => {
        return {
            opacity: 0.8 - ring.value,
            transform: [
                {
                    scale: interpolate(ring.value, [0, 1], [0, 4]),
                },
            ],
        };
    });
    useEffect(() => {
        ring.value = withDelay(delay, withRepeat(withTiming(1, { duration: 2000 }), -1, false));
    }, []);
    return <Animated.View style={[styles.ring, ringStyle]} />;
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'tomato',
    },
    ring: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 50,
        borderColor: 'tomato',
        borderWidth: 40,
    },
});
