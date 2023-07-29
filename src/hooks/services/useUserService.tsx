// #region IMPORTS -> /////////////////////////////////////
import React, { useContext } from 'react';
import { INewUserDto, UserLoginPayload, UserLoginResponse } from '~/data/model/userApiModel';
import { execService } from '~/manager/errorManager';
import useServiceApi from '../useServiceApi';
import useStorage from '../useStorage';
import { useAppDispatch } from '~/store/storeHooks';
import { accessSlice } from '~/store/AppContext/access';
import { useNavigation } from '@react-navigation/native';
import { AppError, ErrorTypeEnum, ServerApiError } from '~/core/appError';
import AppContext from '~/context/AppContext';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useUserService(): IUseUserService {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Service = useServiceApi();
    const Storage = useStorage();
    const Store = useAppDispatch();
    const Navigation = useNavigation();
    const Context = useContext(AppContext);
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const login = async (payload: UserLoginPayload): Promise<boolean> => {
        const session = await execService(Service.post<UserLoginResponse, UserLoginPayload>('user/login', payload));

        if ((session as unknown as ServerApiError).errorCode) {
            const error = session as unknown as ServerApiError;
            throw new AppError(ErrorTypeEnum.Functional, error.message, error.errorCode, error?.data);
        }

        await Storage.setSession({ token: session.refreshToken, email: session.email, isAccountFinalized: session.isAccountFinalized });
        Context.setAccess(session.accessToken);
        return true;
    };

    const logout = async (): Promise<void> => {
        Context.setAccess(null);
        await Storage.removeSession().then((res) => {
            if (res) Navigation.navigate('Login');
        });
    };

    const subscribe = async (payload: INewUserDto) => {
        const request = await Service.post('/user/add', payload);
        handleErrors(request);
        return true;
    };

    const handleErrors = (response: any) => {
        if ((response as unknown as ServerApiError).errorCode) {
            const error = response as unknown as ServerApiError;
            switch (error.errorCode) {
                case 'wrong_credentials':
                    throw new AppError(ErrorTypeEnum.Functional, 'Email et/ou mot de passe invalide', error.errorCode);
                case 'email_already_used':
                    throw new AppError(ErrorTypeEnum.Functional, 'Adresse email non disponible', error.errorCode);
                case 'username_already_used':
                    throw new AppError(ErrorTypeEnum.Functional, "Nom d'utilisateur non disponible", error.errorCode);
                default:
                    throw new AppError(ErrorTypeEnum.Technical, 'une erreur est survenue', error.errorCode);
            }
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { login, logout, subscribe };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseUserService {
    login: (payload: UserLoginPayload) => Promise<boolean>;
    subscribe: (payload: INewUserDto) => Promise<boolean>;
    logout: () => Promise<void>;
}
// #enderegion IPROPS --> //////////////////////////////////
