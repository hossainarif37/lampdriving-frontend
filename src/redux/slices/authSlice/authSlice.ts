import { authSliceState } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";


const initialState: authSliceState = {
    isAuthenticate: false,
    isAuthLoading: true,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        saveUser: (state, { payload }) => {
            state.isAuthenticate = payload.isAuthenticate;
            state.isAuthLoading = payload.isLoading;
            state.user = payload.user;
        },
        removeUser: (state) => {
            state.isAuthenticate = false;
            state.isAuthLoading = false;
            state.user = null;
        }
    }
})

export const { saveUser, removeUser } = authSlice.actions;

export default authSlice.reducer;