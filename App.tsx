import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { theme } from '~/constants/themes';
import Router from '~/core/router/Router';
import userServices from '~/services/userServices';
import ErrorBoundary from '~/core/ErrorBoundary';
import { Provider } from 'react-redux';
import store from '~/store';

export default function App() {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <SafeAreaProvider>
                        <Router />
                        <StatusBar style="auto" />
                    </SafeAreaProvider>
                </ThemeProvider>
            </Provider>
        </ErrorBoundary>
    );
}
