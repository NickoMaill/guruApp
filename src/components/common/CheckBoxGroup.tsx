// #region IMPORTS -> /////////////////////////////////////
import { Stack } from '@rneui/layout';
import { CheckBox, Text } from '@rneui/themed';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function CheckBoxGroup<T>({ data, currentValue, onChange, label, disabled, containerStyle }: ICheckBoxGroup<T>) {
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
        <View style={[{ marginTop: 10 }, containerStyle]}>
            <Text>{label}</Text>
            <Stack>
                {data.map((element, i) => {
                    return (
                        <CheckBox
                            key={i}
                            disabled={disabled}
                            title={element.label}
                            checked={currentValue.includes(element.value)}
                            onPress={() => onChange(element.value)}
                            disabledTitleStyle={{ opacity: 0.5 }}
                            checkedColor="tomato"
                        />
                    );
                })}
            </Stack>
        </View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ICheckBoxGroup<T> {
    data: CheckBoxPropsData<T>[];
    currentValue: T[];
    onChange: (value: T) => void;
    disabled?: boolean;
    label?: string;
    containerStyle?: StyleProp<ViewStyle>;
}

export type CheckBoxPropsData<T> = {
    label: string;
    value: T;
};
// #enderegion IPROPS --> //////////////////////////////////
