import { UserLoginResponse } from "~/data/model/userApiModel";
import storageManager from "../manager/storageManager";
import { useAppDispatch } from "~/store/storeHooks";
import { sessionSlice } from "~/store/AppContext/session";

export default function useStorage(): IUseStorage {
	const Store = useAppDispatch();
	const getSession = async (): Promise<UserLoginResponse> => {
		const session = await storageManager.getItem<UserLoginResponse>("session");
		if (!session) {
			return null
		}
		return session;
	}

	const setSession = async (session: UserLoginResponse): Promise<boolean> => {
		await storageManager.setItem<UserLoginResponse>("session", session);
		Store(sessionSlice.actions.setSession(session));
		return true;
	}
	return { getSession, setSession };
}

interface IUseStorage {
	getSession: () => Promise<UserLoginResponse>,
	setSession: (session: UserLoginResponse) => Promise<boolean>
}
