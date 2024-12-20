import { IUser } from "./user";

export interface ILearner {
    user: string | IUser;
    bookings: string[];
    transactions: string[];
    reviews: string[];
}