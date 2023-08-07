// #region IMPORTS -> /////////////////////////////////////
import React from 'react';
import { Regular } from './Text';
import { SearchBar as RootSearchBar } from '@rneui/themed';
import { FlatList, TouchableOpacity } from 'react-native';
import configManager from '~/manager/configManager';
import { View } from 'react-native';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function SearchBar<T>({ data, value, label, keyToDisplay, isLoading, placeholder, onChangeText, onSelectItem, onCancel }: ISearchBar<T>) {
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
        <View style={{ marginVertical: 10, marginBottom: data ? 30 : 10 }}>
            <Regular>{label}</Regular>
            <RootSearchBar
                style={{ margin: 0, padding: 0 }}
                containerStyle={{ marginLeft: -8, padding: 0 }}
                value={value}
                onChangeText={onChangeText}
                showLoading={isLoading}
                platform={configManager.isIos() ? 'ios' : 'android'}
                placeholder={placeholder}
                cancelButtonTitle={'Annuler'}
                onCancel={onCancel}
                onClear={() => null}
            />
            {data && (
                <FlatList
                    data={data}
                    contentContainerStyle={{ backgroundColor: '#bdc6cf', borderRadius: 7, borderColor: '#bdc6cf', borderWidth: 1 }}
                    renderItem={(item) => (
                        <TouchableOpacity onPress={() => onSelectItem(item.item)} style={{ padding: 10, backgroundColor: 'white', margin: 3, borderRadius: 7 }}>
                            <Regular>{item.item[keyToDisplay.toString()]}</Regular>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(_, i) => i.toString()}
                />
            )}
        </View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ISearchBar<T> {
    data: T[];
    value: string;
    label: string;
    keyToDisplay: keyof T;
    isLoading: boolean;
    placeholder: string;
    onChangeText: (e: string) => void;
    onSelectItem: (item: T) => void;
    onCancel: () => void;
}
// #enderegion IPROPS --> //////////////////////////////////
