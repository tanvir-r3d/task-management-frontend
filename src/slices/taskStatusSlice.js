import {createSlice} from "@reduxjs/toolkit";

export const taskStatusSlice = createSlice({
    name: 'task',
    initialState: {
        taskStatusList: '',
    },
    reducers: {
        setTaskStatusList: (state, {payload}) => {
            state.taskStatusList = payload;
        },
    }
});

export const {setTaskStatusList} = taskStatusSlice.actions;

export default taskStatusSlice.reducer;