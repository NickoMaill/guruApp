import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserLoginResponse } from '~/data/model/userApiModel';
import { RootState } from '~/store';

interface SessionState {
    value: UserLoginResponse;
}

const initialState: SessionState = {
    value: null,
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState: initialState,
    reducers: {
        setSession: (state, action: PayloadAction<UserLoginResponse>) => {
            state.value = action.payload;
        },
        removeSession: (state) => {
            state.value = null;
        },
    },
});

export const { setSession, removeSession } = sessionSlice.actions;
export const selectSession = (state: RootState) => state.session;
export default sessionSlice.reducer;