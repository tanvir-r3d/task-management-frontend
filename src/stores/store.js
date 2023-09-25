import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import commonReducer from "../slices/commonSlice";
import taskReducer from "../slices/taskSlice";
import taskStatusReducer from "../slices/taskStatusSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        common: commonReducer,
        task: taskReducer,
        taskStatus: taskStatusReducer,
    },
})