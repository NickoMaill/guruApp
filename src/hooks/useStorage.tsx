import { UserSession } from '~/data/model/userApiModel';
import storageManager from '../manager/storageManager';
import { useAppDispatch } from '~/store/storeHooks';

export default function useStorage(): IUseStorage {
    const Store = useAppDispatch();
    const getSession = async (): Promise<UserSession> => {
        const session = await storageManager.getItem<UserSession>('session');
        if (!session) {
            return null;
        }
        return session;
    };

    const setSession = async (session: UserSession): Promise<boolean> => {
        await storageManager.setItem<UserSession>('session', session);
        return true;
    };

    const removeSession = async (): Promise<boolean> => {
        await storageManager.removeItem('session');
        return true;
    };
    return { getSession, setSession, removeSession };
}

interface IUseStorage {
    getSession: () => Promise<UserSession>;
    setSession: (session: UserSession) => Promise<boolean>;
    removeSession: () => Promise<boolean>;
}
