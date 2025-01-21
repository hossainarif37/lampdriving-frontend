import { envConfigs } from "@/configs/envConfigs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create base api
const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: envConfigs.apiUrl,
        credentials: "include"
    }),
    tagTypes: ["User", "instructor", "learner", "booking", "schedule"],
    endpoints: () => ({})
})

export default baseApi;