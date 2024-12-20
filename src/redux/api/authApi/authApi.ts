import { ILoginInputs, IRegisterInputs } from "@/types/auth";
import baseApi from "../baseApi";
import { IResponseBase, IResponseWithData } from "@/types/response";
import { IUser } from "@/types/user";

const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation<IResponseBase, IRegisterInputs>({
            query: (data) => ({
                url: '/auth/learners/register',
                method: "POST",
                body: data
            })
        }),
        loginUser: builder.mutation<IResponseWithData<IUser>, ILoginInputs>({
            query: (data) => ({
                url: '/auth/login',
                method: "POST",
                body: data
            })
        }),
        currentUser: builder.query({
            query: () => '/user/me'
        }),
        logOutUser: builder.query<IResponseBase, void>({
            query: () => '/auth/logout'
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useCurrentUserQuery, useLazyLogOutUserQuery } = usersApi;