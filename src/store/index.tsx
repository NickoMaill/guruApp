import { configureStore } from '@reduxjs/toolkit';
import isAppConfigured from './AppContext/isAppConfigured';
import access from './AppContext/access';

const store = configureStore({
    reducer: {
        access,
        isAppConfigured,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
