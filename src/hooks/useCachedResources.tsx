import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import configManager from '~/manager/configManager';

export default function useCachedResources() {
    const [iseLoadingComplete, setIsLoadingComplete] = useState<boolean>(false);

    const loadResourcesAndDataAsync = async (): Promise<void> => {
        await Font.loadAsync(
            configManager.isIos()
                ? {
                      'sfPro-regular': require('../assets/fonts/SFpro/SF-Pro-Display-Regular.otf'),
                      'sfPro-bold': require('../assets/fonts/SFpro/SF-Pro-Display-Bold.otf'),
                      'sfPro-thin': require('../assets/fonts/SFpro/SF-Pro-Display-Thin.otf'),
                      'sfPro-italic': require('../assets/fonts/SFpro/SF-Pro-Display-RegularItalic.otf'),
                  }
                : {
                      'montserrat-regular': require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
                      'montserrat-bold': require('../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
                      'montserrat-thin': require('../assets/fonts/Montserrat/Montserrat-Thin.ttf'),
                      'montserrat-italic': require('../assets/fonts/Montserrat/Montserrat-Italic.ttf'),
                  }
        )
            .finally(() => {
                setIsLoadingComplete(true);
            })
            .catch((error) => {
                throw new Error('an happened while charging resources');
            });
    };

    useEffect(() => {
        loadResourcesAndDataAsync();
    }, []);

    return iseLoadingComplete;
}
