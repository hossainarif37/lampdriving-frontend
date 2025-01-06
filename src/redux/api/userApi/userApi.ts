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
            invalidatesTags: ["User"]
        }),
        deleteUser: builder.mutation<IResponseBase, { id: string }>({
            query: ({ id }) => ({
                url: `/user/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["User"]
        })
    })
})

export const { useUpdateUserMutation, useDeleteUserMutation } = userApi;