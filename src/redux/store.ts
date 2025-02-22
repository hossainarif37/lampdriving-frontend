import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/baseApi";
import authReducer from "./slices/authSlice/authSlice";
import notificationReducer from "./slices/notificationSlice/notificationSlice";


const store = configureStore({
    reducer: {
        notificationSlice: notificationReducer,
        authSlice: authReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;