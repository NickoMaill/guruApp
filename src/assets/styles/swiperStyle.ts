import { StyleSheet } from 'react-native';

export const swipeStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
    },
    cardStyle: {
        width: '90%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 7,
    },
    cardTitleStyle: {
        color: '#fff',
        fontSize: 24,
        width: '100%',
    },
    swipeText: {
        fontSize: 18,
        textAlign: 'center',
    },
});
