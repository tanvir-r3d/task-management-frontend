import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        deleteId: '',
        tableLoading: true,
    },
    reducers: {
        setDeleteId: (state, { payload }) => {
            state.deleteId = payload;
        },
        clearDeleteId: (state) => {
            state.deleteId = '';
        },
        setTableLoading: (state, { payload }) => {
            state.tableLoading = payload;
        }
    }
});

export const { setDeleteId, clearDeleteId, setTableLoading } = commonSlice.actions;

export default commonSlice.reducer;