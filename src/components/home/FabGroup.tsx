// #region IMPORTS -> /////////////////////////////////////
import { Button, Icon } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function FabGroup({ onLike, onDislike, onComment }: IFabGroup) {
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
        <View style={{ flexDirection: 'row', borderRadius: 100, marginTop: 40, justifyContent: 'space-evenly', marginBottom: 10 }}>
            <Button onPress={onDislike} color="tomato" radius={100} size="lg">
                <Icon name="close" size={40} color={'white'} />
            </Button>
            <Button onPress={onComment} color="tomato" radius={100} size="lg">
                <Icon name="comments" type="font-awesome" size={40} color={'white'} />
            </Button>
            <Button onPress={onLike} color="tomato" radius={100} size="lg">
                <Icon name="heart" type="font-awesome" size={40} color={'white'} />
            </Button>
        </View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IFabGroup {
    onLike?: () => void;
    onDislike?: () => void;
    onComment?: () => void;
}
// #enderegion IPROPS --> //////////////////////////////////
