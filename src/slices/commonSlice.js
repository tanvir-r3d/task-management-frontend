import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        deleteId: '',
    },
    reducers: {
        setDeleteId: (state, { payload }) => {
            state.deleteId = payload;
        },
        clearDeleteId: (state) => {
            state.deleteId = '';
        },
    }
});

export const { setDeleteId, clearDeleteId } = commonSlice.actions;

export default commonSlice.reducer;