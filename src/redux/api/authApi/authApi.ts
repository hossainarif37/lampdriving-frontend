import { ILoginInputs, IRegisterInputs } from "@/types/auth";
import baseApi from "../baseApi";
import { IResponseBase, IResponseWithData } from "@/types/response";
import { IUser } from "@/types/user";
import { IRegisterInstructor } from "@/types/instructor";
import { IUpdatePasswordInputs } from "@/components/shared/forms/UpdatePasswordFields";

const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation<IResponseWithData<IUser>, IRegisterInputs>({
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
            query: () => '/user/me',
            providesTags: ['user']
        }),
        logOutUser: builder.query<IResponseBase, void>({
            query: () => '/auth/logout'
        }),

        registerInstructor: builder.mutation<IResponseWithData<IUser>, IRegisterInstructor>({
            query: (data) => ({
                url: '/auth/instructors/register',
                method: "POST",
                body: data
            })
        }),
        updatePassword: builder.mutation<IResponseBase, IUpdatePasswordInputs>({
            query: (data) => ({
                url: 'auth/password/change',
                method: "PATCH",
                body: data
            })
        }),
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useCurrentUserQuery, useLazyLogOutUserQuery, useRegisterInstructorMutation, useUpdatePasswordMutation } = usersApi;