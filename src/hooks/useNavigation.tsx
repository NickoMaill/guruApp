// #region IMPORTS -> /////////////////////////////////////
import { EventListenerCallback, EventMapCore, NavigationProp, useNavigation as useNav } from '@react-navigation/native';
import React from 'react';
import { AppError, ErrorTypeEnum } from '~/core/appError';
import routerConfig from '~/core/router/routerConfig';
import { RootStackParamList } from '~/core/router/routerType';
import useAuth from './useAuth';
import useStorage from './useStorage';
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
    const checkBeforeNav = async (screen: keyof ReactNavigation.RootParamList): Promise<boolean> => {
        const routesDescriptions = routerConfig.routeDescription;
        const targetRoute = routesDescriptions.find((x) => x.name === screen);
        const session = await Storage.getSession();

        if (!targetRoute) {
            throw new AppError(ErrorTypeEnum.Functional, `the route ${screen} is not recognized`, 'unknown route');
        }

        if (!session) {
            return false;
        }

        if (!session.isAccountFinalized) {
            Nav.navigate('Finalize');
            return;
        }

        if (targetRoute.isProtected) {
            const isAuth = await Auth.isAuthenticated();
            return isAuth;
        } else {
            return true;
        }
    };

    const goTo = (screen: keyof ReactNavigation.RootParamList): void => {
        checkBeforeNav(screen).then((isOk) => {
            if (isOk) {
                Nav.navigate(screen);
            } else {
                Nav.navigate('Login');
            }
        });
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

    const root = Nav;
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { goTo, goBack, root };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseNavigation {
    goTo: (screen: keyof ReactNavigation.RootParamList) => void;
    goBack: () => void;
    root: NavigationProp<ReactNavigation.RootParamList>;
}
// #enderegion IPROPS --> //////////////////////////////////
