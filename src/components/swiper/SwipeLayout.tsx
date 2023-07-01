// #region IMPORTS -> /////////////////////////////////////
import { Text } from '@rneui/themed';
import React, { useState } from 'react';
import { View } from 'react-native';
import SwipeCard from './SwipableCard';
import { swipeStyle } from '~/assets/styles/swiperStyle';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function SwipeLayout({ data }: ISwiperLayout) {
    const [noMoreCard, setNoMoreCard] = useState(false);
    const [sampleCardArray, setSampleCardArray] = useState(data);
    const [swipeDirection, setSwipeDirection] = useState<string>(null);

    const removeCard = (id) => {
        // alert(id);
        sampleCardArray.splice(
            sampleCardArray.findIndex((item) => item.id == id),
            1
        );
        setSampleCardArray(sampleCardArray);
        if (sampleCardArray.length == 0) {
            setNoMoreCard(true);
        }
    };

    const lastSwipedDirection = (swipeDirection: string) => {
        setSwipeDirection(swipeDirection);
    };

    return (
        <View style={swipeStyle.container}>
            {sampleCardArray.map((item, key) => (
                <SwipeCard key={key} item={item} removeCard={() => removeCard(item.id)} swipedDirection={lastSwipedDirection} />
            ))}
            {noMoreCard ? <Text style={{ fontSize: 22, color: '#000' }}>No Cards Found.</Text> : null}
        </View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ISwiperLayout {
    data: { id: string; cardTitle: string }[];
}
// #enderegion IPROPS --> //////////////////////////////////
