import { IAuthSliceState } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";


const initialState: IAuthSliceState = {
    isAuthenticate: false,
    isAuthLoading: true,
    user: null,
    instructor: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        saveUser: (state, { payload }) => {
            state.isAuthenticate = payload.isAuthenticate;
            state.isAuthLoading = payload.isLoading;
            state.user = payload.user;
            state.instructor = payload.instructor;
        },
        removeUser: (state) => {
            state.isAuthenticate = false;
            state.isAuthLoading = false;
            state.user = null;
            state.instructor = null;
        }
    }
})

export const { saveUser, removeUser } = authSlice.actions;

export default authSlice.reducer;