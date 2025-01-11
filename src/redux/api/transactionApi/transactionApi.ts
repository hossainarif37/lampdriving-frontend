import { IResponseBase, IResponseWithData } from "@/types/response";
import baseApi from "../baseApi";

const transactionApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createPaymentIntent: builder.mutation<IResponseWithData<{ clientSecret: string }>, { price: number }>({
            query: (data) => ({
                url: '/payment/payment-intent',
                method: "POST",
                body: data
            })
        })
    })
})

export const { useCreatePaymentIntentMutation } = transactionApi