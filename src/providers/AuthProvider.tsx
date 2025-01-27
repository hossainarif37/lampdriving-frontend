"use client"

import Loading from "@/components/shared/Loading";
import { useCurrentUserQuery } from "@/redux/api/authApi/authApi";
import { saveUser } from "@/redux/slices/authSlice/authSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: userData, isLoading: isUserLoading } = useCurrentUserQuery(undefined)
    const dispatch = useDispatch();

    // for save user after fetching the user from db
    useEffect(() => {
        const payloadObj = { isAuthenticate: false, user: null, isLoading: false, instructor: null };
        // if the success is true then authenticate the user
        if (userData?.success) {
            payloadObj.isAuthenticate = true;
            payloadObj.user = userData.data;
            payloadObj.isLoading = isUserLoading;
            payloadObj.instructor = userData.data.instructor
        } else {
            payloadObj.isAuthenticate = false;
            payloadObj.user = null
            payloadObj.isLoading = isUserLoading;
            payloadObj.instructor = null
        }
        dispatch(saveUser(payloadObj))
    }, [userData, isUserLoading, dispatch])

    // if (isUserLoading) {
    //     return <Loading />
    // }

    return (
        <>
            {children}
        </>
    );
};

export default AuthProvider;