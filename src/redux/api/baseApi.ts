import { envConfigs } from "@/configs/envConfigs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create base api
const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: envConfigs.apiUrl,
        credentials: "include"
    }),
    tagTypes: ["user", "instructor", "learner", "booking", "schedule", "wallet"],
    endpoints: () => ({})
})

export default baseApi;