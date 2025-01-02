import { IUser } from "./user";

export interface ILearner {
    _id?: string
    user: string | IUser;
    bookings: string[];
    transactions: string[];
    reviews: string[];
}