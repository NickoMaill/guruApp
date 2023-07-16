// #region IMPORTS -> /////////////////////////////////////
import React from 'react';
import { Stack } from '@rneui/layout';
import { CheckBox, Text } from '@rneui/themed';
import { View } from 'react-native';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function CheckBoxesGroup<T>({ data, currentValue, onChange, label }: ICheckBoxesGroup<T>) {
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
        <View style={{ marginTop: 10 }}>
            <Text>{label}</Text>
            <Stack row align="baseline">
                {data.map((element, i) => {
                    return <CheckBox key={i} title={element.label} checked={currentValue === element.value} onPress={() => onChange(element.value)} checkedIcon="dot-circle-o" uncheckedIcon="circle-o" />;
                })}
            </Stack>
        </View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ICheckBoxesGroup<T> {
    data: { label: string; value: T }[];
    currentValue: T;
    onChange: (value: T) => void;
    label: string;
}
// #enderegion IPROPS --> //////////////////////////////////
