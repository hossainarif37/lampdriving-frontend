import { IRegisterInputs } from "@/types/auth";
import baseApi from "../baseApi";

const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation<IRegisterInputs, object>({
            query: (data) => ({
                url: '/auth/learners/register',
                method: "POST",
                body: data
            })
        })
    })
})

export const { useRegisterUserMutation } = usersApi;