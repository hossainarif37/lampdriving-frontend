interface ICreateBlogInputs {
    title: string;
    path: string;
    content: string;
    image: string;
}
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://lampdriving-backend.vercel.app/api/v1/blog" }),
    endpoints: (builder) => ({
        createBlog: builder.mutation({
            query: (blogData) => ({
                url: "/",
                method: "POST",
                body: blogData,
            }),
        }),
    }),
});

export const { useCreateBlogMutation } = blogApi;


