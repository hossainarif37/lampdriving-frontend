import { IResponseBase, IResponseWithData, IResponseWithPaginationData } from "@/types/response";
import baseApi from "../baseApi";
import { IBooking, IBookingInputs } from "@/types/booking";

interface IGetAllBookingsQuery {
    status?: "upcoming" | "ongoing" | "completed" | "refunded";
    searchKey: string;
    limit: string;
    page: string;
}

const bookingApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createABooking: builder.mutation<IResponseBase, IBookingInputs>({
            query: (data) => ({
                url: '/booking',
                method: "POST",
                body: data
            }),
            invalidatesTags: ["booking", "schedule"]
        }),
        getAllBookings: builder.query<IResponseWithPaginationData<IBooking[]>, IGetAllBookingsQuery>({
            query: ({ status, searchKey, limit, page }) => `/booking/all?status=${status}&populate=instructor.user,learner.user,payment,schedules&paymentFields=transactionId&learnerFields=user&instructorFields=user&userFields=name,email&schedulesFields=date,time,status,duration${searchKey && `&searchKey=${searchKey}`}&limit=${limit}&page=${page}`, providesTags: ["booking"]
        }),
        getMyBookings: builder.query<IResponseWithPaginationData<IBooking[]>, IGetAllBookingsQuery>({
            query: ({ status, searchKey, limit, page }) => `/booking/my?${status ? `status=${status}` : ""}&populate=instructor.user,learner.user,payment,schedules&paymentFields=transactionId&learnerFields=user&instructorFields=user&userFields=name,email&schedulesFields=date,time,status,duration&sort=-status${searchKey && `&searchKey=${searchKey}`}&limit=${limit}&page=${page}`, providesTags: ["booking"]
        }),
        getABooking: builder.query<IResponseWithData<IBooking>, { id: string }>({
            query: ({ id }) => `/booking/${id}?populate=learner.user,instructor.user,schedules&learnerFields=user&instructorFields=user&userFields=name,email,profileImg&schedulesFields=-instructor,-learner,-booking`
        }),
        updateBookingStatus: builder.mutation<IResponseWithData<IBooking>, { id: string }>({
            query: ({ id }) => ({
                url: `/booking/refund/${id}`,
                method: "PATCH"
            }),
            invalidatesTags: ["booking", "schedule"]
        })
    })
})


export const {
    useCreateABookingMutation,
    useGetAllBookingsQuery,
    useUpdateBookingStatusMutation,
    useGetMyBookingsQuery,
    useGetABookingQuery } = bookingApi