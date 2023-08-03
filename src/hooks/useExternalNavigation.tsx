// #region IMPORTS -> /////////////////////////////////////
import { Linking } from 'react-native';
import { AppError, ErrorTypeEnum } from '~/core/appError';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useExternalNavigation(): IUseExternalNavigation {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const open = async (url: string): Promise<void> => {
        const canOpenURL = await Linking.canOpenURL(url);

        if (canOpenURL) {
            Linking.openURL(url);
        } else {
            throw new AppError(ErrorTypeEnum.Functional, 'no opening provided for this uri', 'no_uri');
        }
    };

    const checkUri = async (url: string): Promise<boolean> => {
        const canOpenURL = await Linking.canOpenURL(url);
        return canOpenURL;
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { open, checkUri };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseExternalNavigation {
    open: (url: string) => Promise<void>;
    checkUri: (url: string) => Promise<boolean>;
}
// #enderegion IPROPS --> //////////////////////////////////
