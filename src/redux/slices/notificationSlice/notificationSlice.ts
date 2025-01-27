// import { INotificationSliceState } from "@/types/notification";
import { createSlice } from "@reduxjs/toolkit";

interface INotificationSliceState {
    notification: string;
    isShow: boolean;
}

const initialState: INotificationSliceState = {
    notification: "",
    isShow: false
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification: (state, { payload }) => {
            state.notification = payload;
            state.isShow = true;
        },
        clearNotification: (state) => {
            state.notification = "";
            state.isShow = false;
        }
    }
})

export const { showNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;