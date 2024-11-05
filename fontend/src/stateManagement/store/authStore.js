import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../slice/authSlice";

export default configureStore({
    reducer: {
        userGlobal: UserReducer,
    },
});
