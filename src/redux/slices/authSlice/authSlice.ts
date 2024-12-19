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
        }
    }
})

export const { saveUser } = authSlice.actions;

export default authSlice.reducer;