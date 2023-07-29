import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { theme } from '~/constants/themes';
import Router from '~/core/router/Router';
import { Provider } from 'react-redux';
import store from '~/store';
import AppContext from '~/context/AppContext';
import { useState } from 'react';

export default function App() {
    const [access, setAccess] = useState<string>(null);

    const values = {
        access,
        setAccess,
    };

    return (
        <Provider store={store}>
            <AppContext.Provider value={values}>
                <ThemeProvider theme={theme}>
                    <SafeAreaProvider>
                        <Router />
                        <StatusBar style="auto" />
                    </SafeAreaProvider>
                </ThemeProvider>
            </AppContext.Provider>
        </Provider>
    );
}
