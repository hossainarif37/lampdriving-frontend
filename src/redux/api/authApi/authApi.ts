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
        resetPasswordEmail: builder.mutation<IResponseBase, { email: string }>({
            query: (data) => ({
                url: `/auth/password/reset-email/${data.email}`,
                method: "POST"
            })
        }),
        verifyResetPasswordOtp: builder.mutation<IResponseWithData<{ resetToken: string }>, { email: string, otp: string }>({
            query: (data) => ({
                url: `/auth/password/reset/verify-otp`,
                method: "POST",
                body: data
            })
        }),
        resetPassword: builder.mutation<IResponseBase, { token: string, newPassword: string }>({
            query: (data) => {
                return ({
                    url: `/auth/password/reset/${data.token}`,
                    method: "PATCH",
                    body: data
                })
            }
        }),
        sendEmailVerification: builder.mutation<IResponseBase, { email: string }>({
            query: (data) => ({
                url: `/auth/email/verification/${data.email}`,
                method: "POST"
            })
        }),
        verifyEmail: builder.mutation<IResponseBase, { token: string }>({
            query: (data) => ({
                url: `/auth/email/verify/${data.token}`,
                method: "PATCH"
            }),
            invalidatesTags: ['user']
        })
    })
})

export const { useRegisterUserMutation,
    useLoginUserMutation,
    useCurrentUserQuery,
    useLazyLogOutUserQuery,
    useRegisterInstructorMutation,
    useUpdatePasswordMutation,
    useResetPasswordEmailMutation,
    useVerifyResetPasswordOtpMutation,
    useResetPasswordMutation,
    useSendEmailVerificationMutation,
    useVerifyEmailMutation
} = usersApi;