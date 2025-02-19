import { envConfigs } from "@/configs/envConfigs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from 'async-mutex'

// Create a mutex to prevent multiple refresh token calls
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: envConfigs.apiUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
        return headers
    },
})
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()

            try {
                const refreshResult = await baseQuery(
                    { url: '/auth/token/refresh', method: 'POST' },
                    api,
                    extraOptions
                )

                if (refreshResult.data) {
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    document.cookie = 'access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                    document.cookie = 'refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }

    return result
}

// create base api
const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["user", "instructor", "learner", "booking", "schedule", "wallet"],
    endpoints: () => ({})
})

export default baseApi;