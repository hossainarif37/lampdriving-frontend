import { IResponseBase } from "@/types/response";
import baseApi from "../baseApi";
import { IBookingInputs } from "@/types/booking";

const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createABooking: builder.mutation<IResponseBase, IBookingInputs>({
            query: (data) => ({
                url: '/booking',
                method: "POST",
                body: data
            })
        })
    })
})


export const { useCreateABookingMutation } = bookingApi