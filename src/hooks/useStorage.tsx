import { UserSession } from '~/data/model/userApiModel';
import storageManager from '../manager/storageManager';

export default function useStorage(): IUseStorage {
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

    const updateSession = async <T extends never>(key: keyof UserSession, value: T): Promise<boolean> => {
        const session = await getSession();
        session[key] = value;
        await storageManager.mergeItem<UserSession>('session', session);
        return true;
    };

    const removeSession = async (): Promise<boolean> => {
        await storageManager.removeItem('session');
        return true;
    };
    return { getSession, setSession, removeSession, updateSession };
}

interface IUseStorage {
    getSession: () => Promise<UserSession>;
    setSession: (session: UserSession) => Promise<boolean>;
    removeSession: () => Promise<boolean>;
    updateSession: <T>(key: keyof UserSession, value: T) => Promise<boolean>;
}
