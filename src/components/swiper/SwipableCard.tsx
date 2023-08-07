// #region IMPORTS -> /////////////////////////////////////
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, ImageBackground, LayoutChangeEvent, PanResponder, View } from 'react-native';
import { swipeStyle } from '~/assets/styles/swiperStyle';
import { RecipesDto } from '~/data/model/recipesApiModel';
import configManager from '~/manager/configManager';
import Title, { Regular } from '../common/Text';
import { Image } from '@rneui/themed';
import { apiHost } from '~/hooks/useServiceApi';
import Icon from '../common/Icon';
import BottomSheet from '@gorhom/bottom-sheet';
import Rating from '../common/Rating';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
const nutriImages = {
    A: require('../../assets/pictures/nutriA.png'),
    B: require('../../assets/pictures/nutriB.png'),
    C: require('../../assets/pictures/nutriC.png'),
    D: require('../../assets/pictures/nutriD.png'),
};
// #endregion SINGLETON --> /////////////////////////////////

export default function SwipeCard({ item, removeCard, swipedDirection, swipeAction }: ISwipeCard) {
    // #region STATE --> ///////////////////////////////////////
    const [xPosition, setXPosition] = useState<Animated.Value>(new Animated.Value(0));
    const [cardLayout, setCardLayout] = useState(null);
    const rotateCard = xPosition.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ['-20deg', '0deg', '20deg'],
    });
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // let xPosition = new Animated.Value(0);
    const cardOpacity = new Animated.Value(1);
    const panRef = useRef<View>(null);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['35%', '7%', '50%'], []);

    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const swipeToRight = () => {
        Animated.parallel([
            Animated.timing(xPosition, { toValue: configManager.dimension.width, duration: 200, useNativeDriver: false }),
            Animated.timing(cardOpacity, { toValue: 0, duration: 200, useNativeDriver: false }),
        ]).start(() => removeCard());
        swipedDirection('right');
    };

    const swipeToLeft = () => {
        Animated.parallel([
            Animated.timing(xPosition, { toValue: -configManager.dimension.width, duration: 200, useNativeDriver: false }),
            Animated.timing(cardOpacity, { toValue: 0, duration: 200, useNativeDriver: false }),
        ]).start(() => removeCard());
        swipedDirection('left');
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => {
            if (!panRef.current || !cardLayout) return false;

            const isPanGesture = gestureState.x0 >= 0 && gestureState.x0 <= configManager.dimension.width;
            const { pageX, pageY, width, height } = cardLayout;
            return isPanGesture && gestureState.moveX >= pageX && gestureState.moveX <= pageX + width && gestureState.moveY >= pageY && gestureState.moveY <= pageY + height;
        },
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: (_evt, gestureState) => {
            if (gestureState.x0 < 100 || gestureState.x0 > 220) {
                xPosition.setValue(gestureState.dx);
            }
        },
        onPanResponderRelease: (_evt, gestureState) => {
            if (gestureState.dx < configManager.dimension.width - 150 && gestureState.dx > -configManager.dimension.width + 150) {
                Animated.spring(xPosition, { toValue: 0, speed: 6, bounciness: 10, useNativeDriver: false }).start();
            } else if (gestureState.dx > configManager.dimension.width - 150) {
                swipeToRight();
            } else if (gestureState.dx < -configManager.dimension.width + 150) {
                swipeToLeft();
            }
        },
    });

    const handleCardLayout = (event: LayoutChangeEvent) => {
        setCardLayout(event.nativeEvent.layout);
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        if (swipeAction.id === item.id) {
            if (swipeAction.direction === 'left') {
                swipeToLeft();
            } else {
                swipeToRight();
            }
        }
    }, [swipeAction]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Animated.View
            {...panResponder.panHandlers}
            onLayout={handleCardLayout}
            ref={panRef}
            style={[swipeStyle.cardStyle, { opacity: cardOpacity, transform: [{ translateX: xPosition }, { rotate: rotateCard }] }]}
        >
            <View style={{ width: '100%', height: '100%' }}>
                <ImageBackground
                    loadingIndicatorSource={require('../../assets/pictures/whiteLoading.jpeg')}
                    resizeMode="cover"
                    borderRadius={10}
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                    source={{ uri: apiHost + '/uploads/recipes/' + item.pictureUrl }}
                >
                    <BottomSheet
                        backgroundStyle={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                        ref={bottomSheetRef}
                        snapPoints={snapPoints}
                        style={{ padding: 10, justifyContent: 'flex-end', borderRadius: 10 }}
                    >
                        <View onTouchStart={(e) => e.stopPropagation()}>
                            <Title>{item.name}</Title>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 }}>
                                    <Icon name="restaurant" type="ionicon" color="black" />
                                    <Regular style={{ fontSize: 19, flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>{item.howManyPersons}</Regular>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="clockcircle" type="antdesign" color="black" />
                                    <Regular style={{ fontSize: 19, flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>{item.preparationTime / 60} min</Regular>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'flex-end', width: '95%' }}>
                                    <Image style={{ width: 82, height: 45, justifyContent: 'flex-end' }} source={nutriImages[item.nutriScore.toUpperCase()]} />
                                </View>
                            </View>
                            <View>
                                <Regular>Difficulté</Regular>
                                <Rating difficulty={item.difficulty} />
                            </View>
                        </View>
                    </BottomSheet>
                </ImageBackground>
            </View>
        </Animated.View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ISwipeCard {
    item: RecipesDto;
    removeCard: () => void;
    swipedDirection: (direction: string) => void;
    swipeAction: { direction: 'right' | 'left'; id: number };
}
// #enderegion IPROPS --> //////////////////////////////////
