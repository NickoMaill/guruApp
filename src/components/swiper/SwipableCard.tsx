// #region IMPORTS -> /////////////////////////////////////
import { Text } from '@rneui/themed';
import React, { useState } from 'react';
import { Animated, PanResponder, ScrollView, StyleSheet } from 'react-native';
import { swipeStyle } from '~/assets/styles/swiperStyle';
import configManager from '~/manager/configManager';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function SwipeCard({ item, removeCard, swipedDirection }: ISwipeCard) {
    // let xPosition = new Animated.Value(0);
    const [xPosition, setXPosition] = useState(new Animated.Value(0));
    let cardOpacity = new Animated.Value(1);
    let rotateCard = xPosition.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ['-20deg', '0deg', '20deg'],
    });

    let panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: (_evt, gestureState) => {
            if (gestureState.x0 < 120 || gestureState.x0 > 200) {
                xPosition.setValue(gestureState.dx);
            }
        },
        onPanResponderRelease: (_evt, gestureState) => {
            if (gestureState.dx < configManager.dimension.width - 150 && gestureState.dx > -configManager.dimension.width + 150) {
                Animated.spring(xPosition, { toValue: 0, speed: 6, bounciness: 10, useNativeDriver: false }).start();
            } else if (gestureState.dx > configManager.dimension.width - 150) {
                Animated.parallel([
                    Animated.timing(xPosition, { toValue: configManager.dimension.width, duration: 200, useNativeDriver: false }),
                    Animated.timing(cardOpacity, { toValue: 0, duration: 200, useNativeDriver: false }),
                ]).start(() => removeCard());
            } else if (gestureState.dx < -configManager.dimension.width + 150) {
                Animated.parallel([
                    Animated.timing(xPosition, { toValue: -configManager.dimension.width, duration: 200, useNativeDriver: false }),
                    Animated.timing(cardOpacity, { toValue: 0, duration: 200, useNativeDriver: false }),
                ]).start(() => removeCard());
            }
        },
    });

    return (
        <Animated.View {...panResponder.panHandlers} style={[swipeStyle.cardStyle, { opacity: cardOpacity, transform: [{ translateX: xPosition }, { rotate: rotateCard }] }]}>
            <ScrollView style={{ width: '100%' }}></ScrollView>
        </Animated.View>
    );
}

// #region IPROPS -->  /////////////////////////////////////
interface ISwipeCard {
    item: { id: string; cardTitle: string };
    removeCard: () => void;
    swipedDirection: (direction: string) => void;
}
// #enderegion IPROPS --> //////////////////////////////////
