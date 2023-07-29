import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '~/store';

interface AccessState {
    value: string;
}

const initialState: AccessState = {
    value: null,
};

export const accessSlice = createSlice({
    name: 'access',
    initialState: initialState,
    reducers: {
        setAccess: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        removeAccess: (state) => {
            state.value = null;
        },
    },
});

export const { setAccess, removeAccess } = accessSlice.actions;
export const selectAccess = (state: RootState) => state.access.value;
export default accessSlice.reducer;
