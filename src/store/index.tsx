import { configureStore } from '@reduxjs/toolkit';
import isAppConfigured from './AppContext/isAppConfigured';
import session from './AppContext/session';

const store = configureStore({
    reducer: {
        session: session,
        isAppConfigured: isAppConfigured
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
