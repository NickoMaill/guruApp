// #region IMPORTS -> /////////////////////////////////////
import useStorage from './useStorage';
import useServiceApi from './useServiceApi';
import { execService } from '~/manager/errorManager';
import { useContext } from 'react';
import AppContext from '~/context/AppContext';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useAuth(): IUseAuth {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Context = useContext(AppContext);
    const Storage = useStorage();
    const Service = useServiceApi();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const isAuthenticated = async (): Promise<boolean> => {
        try {
            if (!Context.access) {
                const session = await Storage.getSession();
                if (session) {
                    const newAccess = await execService(Service.get<{ accessToken: string }>('user/refresh', { 'X-refresh-token': session.token }));
                    if (newAccess.accessToken) {
                        Context.setAccess(newAccess.accessToken);
                        return true;
                    }
                }
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { isAuthenticated };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseAuth {
    isAuthenticated: () => Promise<boolean>;
}
// #enderegion IPROPS --> //////////////////////////////////
