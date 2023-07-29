// #region IMPORTS -> /////////////////////////////////////
import { Text } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function SelectInput<T>({ data, value, icon, onChange, label, containerStyle }: ISelectInput<T>) {
    // #region STATE --> ///////////////////////////////////////
    const [isFocus, setIsFocus] = useState(false);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const renderLabel = () => {
        if (value !== null || isFocus) {
            return <Text style={[styles.label, isFocus && { color: 'blue' }]}>{label}</Text>;
        }
        return null;
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <View style={[styles.container, containerStyle]}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? label : '...'}
                // searchPlaceholder="Search..."
                value={value as any}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                    onChange(item);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => <AntDesign style={styles.icon} color={isFocus ? 'blue' : 'black'} name={icon} size={20} />}
            />
        </View>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ISelectInput<T> {
    data: { label: any; value: T }[];
    value: T;
    onChange: (item: { label: string; value: T }) => void;
    icon: any;
    label: string;
    containerStyle?: StyleProp<ViewStyle>;
}
// #enderegion IPROPS --> //////////////////////////////////

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginBottom: 15,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 15,
        top: -7,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
