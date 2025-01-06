import { ILoginInputs, IRegisterInputs } from "@/types/auth";
import baseApi from "../baseApi";
import { IResponseBase, IResponseWithData } from "@/types/response";
import { IUser } from "@/types/user";
import { IRegisterInstructor } from "@/types/instructor";

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
            query: () => '/user/me',
            providesTags: ['User']
        }),
        logOutUser: builder.query<IResponseBase, void>({
            query: () => '/auth/logout'
        }),

        registerInstructor: builder.mutation<IResponseBase, IRegisterInstructor>({
            query: (data) => ({
                url: '/auth/instructors/register',
                method: "POST",
                body: data
            })
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useCurrentUserQuery, useLazyLogOutUserQuery, useRegisterInstructorMutation } = usersApi;