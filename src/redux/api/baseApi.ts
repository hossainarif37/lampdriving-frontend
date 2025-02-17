import { envConfigs } from "@/configs/envConfigs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from 'async-mutex'

// Create a mutex to prevent multiple refresh token calls
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: envConfigs.apiUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
        // Add any default headers here
        return headers
    },
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()

            try {
                // try to get a new token
                const refreshResult = await baseQuery(
                    { url: '/auth/token/refresh', method: 'POST' },
                    api,
                    extraOptions
                )

                if (refreshResult.data) {
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    // Handle logout here if needed
                    // window.location.href = '/login'
                }
            } finally {
                // release must be called once the mutex should be released again.
                release()
            }
        } else {
            // wait until the mutex is available without locking it
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