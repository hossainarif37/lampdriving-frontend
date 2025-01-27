import { ISchedule } from "./schedule";

export interface IInstructorStats {
    totalBookings: number;
    completedBookings: number;
    ongoingBookings: number;
    upcomingBookings: number;
    upcomingSchedules: ISchedule[]
    totalEarnings: number;
}