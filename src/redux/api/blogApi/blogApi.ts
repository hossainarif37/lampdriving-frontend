import { IResponseBase } from "@/types/response";
import baseApi from "../baseApi";

interface ICreateBlogInputs {
    title: string;
    path: string;
    content: string;
    image: string;
}

const blogApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createBlog: builder.mutation<IResponseBase, ICreateBlogInputs>({
            query: (data) => ({
                url: '/blog',
                method: "POST",
                body: data,
            }),
            // invalidatesTags: ["Blog"],
        }),
        // Add other operations like fetching, updating, and deleting blogs here
    }),
});

export const { useCreateBlogMutation } = blogApi;
