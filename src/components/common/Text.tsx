import { Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, TextProps } from 'react-native';
import configManager from '~/manager/configManager';

const fontFamily = configManager.isIos() ? 'sfPro' : 'montserrat';

export function Regular(props: TextProps) {
    return <Text {...props} style={[props.style, { fontFamily: fontFamily + '-regular' }]} />;
}
export function Bold(props: TextProps) {
    return <Text {...props} style={[props.style, { fontFamily: fontFamily + '-bold' }]} />;
}
export function Thin(props: TextProps) {
    return <Text {...props} style={[props.style, { fontFamily: fontFamily + '-thin' }]} />;
}
export function Italic(props: TextProps) {
    return <Text {...props} style={[props.style, { fontFamily: fontFamily + '-italic' }]} />;
}
export default function Title(props: TextProps) {
    return <Bold {...props} style={[styles.title, props.style]} />;
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        marginVertical: 10,
    },
});
