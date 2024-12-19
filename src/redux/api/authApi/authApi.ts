import { ILoginInputs, IRegisterInputs } from "@/types/auth";
import baseApi from "../baseApi";
import { IResponseBase, IResponseWithData } from "@/types/response";
import { IUser } from "@/types/user";

const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation<IRegisterInputs, IResponseBase>({
            query: (data) => ({
                url: '/auth/learners/register',
                method: "POST",
                body: data
            })
        }),
        loginUser: builder.mutation<ILoginInputs, IResponseWithData<IUser>>({
            query: (data) => ({
                url: '/auth/login',
                method: "POST",
                body: data
            })
        }),
        currentUser: builder.query<void, IResponseWithData<IUser>>({
            query: () => '/user/me'
        }),
        logOutUser: builder.query<void, void>({
            query: () => '/auth/logout'
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useCurrentUserQuery, useLazyLogOutUserQuery } = usersApi;