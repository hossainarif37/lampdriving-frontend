import { IResponseBase } from "@/types/response";
import baseApi from "../baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: (data) => ({
                url: '/user/me',
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["user"]
        }),
        deleteUser: builder.mutation<IResponseBase, { id: string }>({
            query: ({ id }) => ({
                url: `/user/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["user"]
        }),
        updateUserStatus: builder.mutation<IResponseBase, { id: string, status: "active" | "blocked" }>({
            query: ({ id, status }) => ({
                url: `/user/status/${id}`,
                method: "PATCH",
                body: { status }
            }),
            invalidatesTags: ["user", "instructor", "learner"]
        })
    })
})

export const { useUpdateUserMutation, useDeleteUserMutation, useUpdateUserStatusMutation } = userApi;