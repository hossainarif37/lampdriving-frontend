import { ILoginInputs, IRegisterInputs } from "@/types/auth";
import baseApi from "../baseApi";

const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation<IRegisterInputs, object>({
            query: (data) => ({
                url: '/auth/learners/register',
                method: "POST",
                body: data
            })
        }),
        loginUser: builder.mutation<ILoginInputs, object>({
            query: (data) => ({
                url: '/auth/login',
                method: "POST",
                body: data
            })
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation } = usersApi;