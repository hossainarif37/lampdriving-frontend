import { IAddress } from "./user";

export interface ISchedule {
    _id: string;
    booking?: string;
    instructor: string;
    learner?: string;
    date: Date;
    time: string[];
    duration: number;
    pickupAddress: IAddress;
    dropOffAddress?: IAddress;
    type: "lesson" | "test" | "mock-test" | "blank";
    status: "upcoming" | "ongoing" | "completed" | "rescheduled" | "cancelled";
}