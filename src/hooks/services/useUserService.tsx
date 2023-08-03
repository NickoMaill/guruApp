// #region IMPORTS -> /////////////////////////////////////
import { useContext } from 'react';
import { INewUserDto, IUserDto, UpdateUserDto, UserLoginPayload, UserLoginResponse } from '~/data/model/userApiModel';
import { execService } from '~/manager/errorManager';
import useServiceApi from '../useServiceApi';
import useStorage from '../useStorage';
import useNavigation from '../useNavigation';
import { AppError, ErrorTypeEnum, ServerApiError } from '~/core/appError';
import AppContext from '~/context/AppContext';
import useAuth from '../useAuth';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useUserService(): IUseUserService {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Service = useServiceApi();
    const Storage = useStorage();
    const Navigation = useNavigation();
    const Context = useContext(AppContext);
    const Auth = useAuth();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const login = async (payload: UserLoginPayload): Promise<boolean> => {
        const session = await execService(Service.post<UserLoginResponse, UserLoginPayload>('user/login', payload));
        handleErrors(session);
        await Storage.setSession({ token: session.refreshToken, email: session.email, isAccountFinalized: session.isAccountFinalized });
        Context.setAccess(session.accessToken);
        return true;
    };

    const logout = async (): Promise<void> => {
        Context.setAccess(null);
        await Storage.removeSession().then((res) => {
            if (res) Navigation.goTo('Login');
        });
    };

    const subscribe = async (payload: INewUserDto) => {
        const request = await execService(Service.post('user/add', payload));
        handleErrors(request);
        return true;
    };

    const finalizeAccount = async (payload: UpdateUserDto): Promise<boolean> => {
        const request = await execService(Service.put('user/me/finalize', payload));
        handleErrors(request);
        await Storage.updateSession('isAccountFinalized', true);
        return true;
    };

    const getMe = async (): Promise<IUserDto> => {
        const isAuth = await Auth.isAuthenticated();
        if (!isAuth) {
            await logout();
        }
        const request = await execService<IUserDto>(Service.get('user/me'));
        handleErrors(request);
        return request;
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
                case 'already_finalized':
                    throw new AppError(ErrorTypeEnum.Functional, 'Compte guru déjà finalisé', error.errorCode);
                case 'no_user_found':
                    throw new AppError(ErrorTypeEnum.Functional, 'aucun utilisateur trouvé', error.errorCode);
                default:
                    throw new AppError(ErrorTypeEnum.Technical, 'une erreur est survenue', error.errorCode);
            }
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { login, logout, subscribe, finalizeAccount, getMe };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseUserService {
    login: (payload: UserLoginPayload) => Promise<boolean>;
    subscribe: (payload: INewUserDto) => Promise<boolean>;
    logout: () => Promise<void>;
    finalizeAccount: (payload: UpdateUserDto) => Promise<boolean>;
    getMe: () => Promise<IUserDto>;
}
// #enderegion IPROPS --> //////////////////////////////////
