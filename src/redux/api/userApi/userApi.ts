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
    })
})

export const { useUpdateUserMutation } = userApi;