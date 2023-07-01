import { Icon, Text } from '@rneui/themed';
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

// singleton --> start region ////////////////////////////////////
// singleton --> end region //////////////////////////////////////

export default function LongButton({ label, onPress, index, customStyle }: ISetupBlanksButton) {
    // state --> start region ////////////////////////////////////
    // state --> end region //////////////////////////////////////

    // hooks --> start region ////////////////////////////////////
    // hooks --> end region //////////////////////////////////////

    // methods --> start region //////////////////////////////////
    const customBorderRadius = (): StyleProp<ViewStyle> => {
        const radius = 20;
        if (index < 3) {
            return {
                borderTopLeftRadius: index === 0 ? radius : 0,
                borderTopRightRadius: index === 0 ? radius : 0,
                borderBottomLeftRadius: index === 2 ? radius : 0,
                borderBottomRightRadius: index === 2 ? radius : 0,
                borderTopWidth: index === 0 ? 1 : 0,
            };
        } else {
            return {
                borderRadius: radius,
            };
        }
    };
    // methods --> end region ////////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    return (
        <TouchableOpacity style={[styles.button, customBorderRadius(), customStyle]} onPress={onPress}>
            <Text>{label}</Text>
            <Icon name="keyboard-arrow-right" size={22} />
        </TouchableOpacity>
    );
    // render --> end region /////////////////////////////////////
}

// props interface --> start region //////////////////////////////
interface ISetupBlanksButton {
    label: string;
    onPress: () => void;
    index?: number;
    customStyle?: StyleProp<ViewStyle>;
}
// props interface --> end region ////////////////////////////////

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#ffffff",
        padding: 20,
        borderWidth: 1,
        borderColor: "#000000",
    },
});