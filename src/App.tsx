import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from '@rneui/themed';
import { theme } from '~/constants/themes';
import Router from '~/core/router/Router';
import AppContext from '~/context/AppContext';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/en-gb';
import '~/resources/i18n/i18n';
import { customToastConfig } from './hooks/useNotification';
import useCachedResources from './hooks/useCachedResources';

export default function App() {
    const [access, setAccess] = useState<string>(null);
    const [swipeToLeft, setSwipeToLeft] = useState<boolean>(false);
    const [swipeToRight, setSwipeToRight] = useState<boolean>(false);
    const isResourcesLoaded = useCachedResources();

    const values = {
        access,
        setAccess,
        swipeToLeft,
        setSwipeToLeft,
        swipeToRight,
        setSwipeToRight,
    };

    moment.locale('fr');

    if (!isResourcesLoaded) {
        return null;
    } else {
        return (
            <AppContext.Provider value={values}>
                <ThemeProvider theme={theme}>
                    <SafeAreaProvider>
                        <Router />
                        <StatusBar style="auto" />
                        <Toast config={customToastConfig} />
                    </SafeAreaProvider>
                </ThemeProvider>
            </AppContext.Provider>
        );
    }
}
