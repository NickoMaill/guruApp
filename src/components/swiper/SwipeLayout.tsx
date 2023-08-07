// #region IMPORTS -> /////////////////////////////////////
import { Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import SwipeCard from './SwipableCard';
import { swipeStyle } from '~/assets/styles/swiperStyle';
import { RecipesDto } from '~/data/model/recipesApiModel';
import FabGroup from '../home/FabGroup';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function SwipeLayout({ data, onEndOfList }: ISwiperLayout) {
    // #region STATE --> ///////////////////////////////////////
    const [cards, setCards] = useState<RecipesDto[]>(data);
    const [swipeDirection, setSwipeDirection] = useState<string>(null);
    const [swipeAction, setSwipeAction] = useState<{ direction: 'left' | 'right'; id: number }>({ direction: 'left', id: 0 });
    const [currentId, setCurrentId] = useState<number>(null);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const removeCard = (id: number) => {
        setCards((prevState) => {
            return prevState.filter((x) => x.id !== id);
        });
    };

    const lastSwipedDirection = (swipeDirection: string) => {
        setSwipeDirection(swipeDirection);
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        if (cards.length === 0) {
            onEndOfList(true);
        }
    }, [cards]);
    // #endregion USEEFFECT --> ////////////////////////////////

    return (
        <View style={{ flex: 1 }}>
            <View style={swipeStyle.container}>
                {cards.map((item, key) => (
                    <SwipeCard key={key} swipeAction={swipeAction} item={item} removeCard={() => removeCard(item.id)} swipedDirection={lastSwipedDirection} />
                ))}
            </View>
            <FabGroup
                onComment={() => {}}
                onDislike={() => setSwipeAction({ direction: 'left', id: cards[cards.length - 1].id })}
                onLike={() => setSwipeAction({ direction: 'right', id: cards[cards.length - 1].id })}
            />
        </View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ISwiperLayout {
    data: RecipesDto[];
    onEndOfList: (isEnd: boolean) => void;
}
// #enderegion IPROPS --> //////////////////////////////////
