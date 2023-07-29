import { Dispatch, SetStateAction, createContext } from 'react';

interface IAppContext {
    access: string;
    setAccess?: Dispatch<SetStateAction<string>>;
}

const initialState: IAppContext = {
    access: null,
};

const AppContext = createContext<IAppContext>(initialState);
export default AppContext;
