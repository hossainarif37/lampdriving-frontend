import { IBooking } from "./booking";
import { IUser } from "./user";

export interface IPayment {
    user: string | IUser;
    booking: string | IBooking;
    transactionId: string;
    method: string;
    amount: number;
    type: "booking" | "withdrawn";
    status: "paid" | "refunded";
}