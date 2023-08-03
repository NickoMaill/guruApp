// #region IMPORTS -> /////////////////////////////////////
import { NavigationProp, useNavigation as useNav } from '@react-navigation/native';
import { AppError, ErrorTypeEnum } from '~/core/appError';
import routerConfig from '~/core/router/routerConfig';
import useAuth from './useAuth';
import useStorage from './useStorage';
import * as Linking from 'expo-linking';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useNavigation(): IUseNavigation {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Nav = useNav();
    const Auth = useAuth();
    const Storage = useStorage();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const checkBeforeNav = async (screen: keyof ReactNavigation.RootParamList): Promise<keyof ReactNavigation.RootParamList> => {
        const routesDescriptions = routerConfig.routeDescription;
        const targetRoute = routesDescriptions.find((x) => x.name === screen);
        const session = await Storage.getSession();

        if (!targetRoute) {
            throw new AppError(ErrorTypeEnum.Functional, `the route ${screen} is not recognized`, 'unknown route');
        }

        if (!session) {
            return 'Login';
        }

        if (!session.isAccountFinalized) {
            return 'Finalize';
        }

        if (targetRoute.isProtected) {
            const isAuth = await Auth.isAuthenticated();
            if (isAuth) {
                return screen;
            } else {
                return 'Login';
            }
        } else {
            return screen;
        }
    };

    const goTo = (screen: keyof ReactNavigation.RootParamList): void => {
        checkBeforeNav(screen).then((target) => Nav.navigate(target));
    };

    const goBack = (): void => {
        const history = Nav.getState().routes[1].name;
        checkBeforeNav(history).then((isOk) => {
            if (isOk) {
                Nav.canGoBack() ? Nav.goBack() : null;
            } else {
                Nav.navigate('Login');
            }
        });
    };

    const goToExternal = (url: string): void => {
        if (!Linking.canOpenURL(url)) {
            throw new AppError(ErrorTypeEnum.Technical, 'cannot open url', 'cannot_open');
        }
        Linking.openURL(url);
    };

    const root = Nav;
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { goTo, goBack, goToExternal, root };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseNavigation {
    goTo: (screen: keyof ReactNavigation.RootParamList) => void;
    goBack: () => void;
    goToExternal: (url: string) => void;
    root: NavigationProp<ReactNavigation.RootParamList>;
}
// #enderegion IPROPS --> //////////////////////////////////
