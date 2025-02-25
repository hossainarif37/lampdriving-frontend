import { ILearnerLicense } from "./auth";
import { IBooking } from "./booking";
import { IReview } from "./review";
import { IUser } from "./user";

export interface ILearner {
    _id: string;
    user: string | IUser;
    bookings: string[] | IBooking[];
    payments: string[];
    reviews: string[] | IReview[];
    license: ILearnerLicense
}