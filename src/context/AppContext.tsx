import React, { Dispatch, SetStateAction, createContext } from 'react';

interface IAppContext {
    access: string;
    setAccess?: Dispatch<SetStateAction<string>>;
    swipeToLeft?: boolean;
    setSwipeToLeft?: Dispatch<SetStateAction<boolean>>;
    swipeToRight?: boolean;
    setSwipeToRight?: Dispatch<SetStateAction<boolean>>;
}

const initialState: IAppContext = {
    access: null,
    swipeToLeft: false,
    swipeToRight: false,
};

const AppContext = createContext<IAppContext>(initialState);
export default AppContext;
