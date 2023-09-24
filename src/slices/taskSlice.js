import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        taskList: '',
    },
    reducers: {
        setTaskList: (state, { payload }) => {
            state.taskList = payload;
        },
    }
});

export const { setTaskList } = taskSlice.actions;

export default taskSlice.reducer;