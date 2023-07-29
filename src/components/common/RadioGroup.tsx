// #region IMPORTS -> /////////////////////////////////////
import React from 'react';
import { Stack } from '@rneui/layout';
import { CheckBox, Text } from '@rneui/themed';
import { StyleProp, View, ViewStyle } from 'react-native';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function RadioGroup<T>({ data, currentValue, onChange, label, disabled, containerStyle }: IRadioGroup<T>) {
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
            <Stack row align="baseline" style={{ margin: 0, padding: 0 }}>
                {data.map((element, i) => {
                    return (
                        <CheckBox
                            key={i}
                            disabled={disabled}
                            title={element.label}
                            checked={currentValue === element.value}
                            onPress={() => onChange(element.value)}
                            disabledTitleStyle={{ opacity: 0.5 }}
                            checkedColor="tomato"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                        />
                    );
                })}
            </Stack>
        </View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IRadioGroup<T> {
    data: RadioPropsData<T>[];
    currentValue: T;
    onChange: (value: T) => void;
    disabled?: boolean;
    label?: string;
    containerStyle?: StyleProp<ViewStyle>;
}

export type RadioPropsData<T> = {
    label: string;
    value: T;
};
// #enderegion IPROPS --> //////////////////////////////////
