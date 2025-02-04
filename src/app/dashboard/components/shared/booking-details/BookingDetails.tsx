"use client"
import { useGetABookingQuery } from '@/redux/api/bookingApi/bookingApi';
import { ISchedule } from '@/types/schedule';
import { format } from 'date-fns';
import { ArrowRight, CalendarDays, Clock, MapPin, User } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';
import BookingDetailsSkeleton from './BookingDetailsSkeleton';
import { firstLetterUppercase } from '@/utils/firstLetterUppercase';



const BookingDetails: FC<{ id: string, role?: 'learner' | 'instructor' }> = ({ id, role }) => {
    const { data, isLoading } = useGetABookingQuery({ id });
    const booking = data?.data;

    if (isLoading)
        return <BookingDetailsSkeleton isAdmin={role ? false : true} />

    if (!booking) return <div className='flex justify-center items-center h-96 px-2 py-4'>
        <h1>No Booking Data Found</h1>
    </div>;
    return (
        <div className="space-y-6 h-96 overflow-y-auto thin-scrollbar px-2 py-4">
            {/* Learner Info */}
            <div className={`grid grid-cols-1 ${!role && "md:grid-cols-2"} gap-6`}>
                {
                    role !== "learner" &&
                    <div className="bg-white p-4 rounded-lg border relative">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="relative">
                                <Image
                                    width={64}
                                    height={64}
                                    src={(booking.learner as any).user.profileImg}
                                    alt="Learner"
                                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary ring-offset-2"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full">
                                    <User className="w-4 h-4" />
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{(booking.instructor as any).user.name.fullName}</p>
                                <p className="text-sm font-medium text-primary/80">Email: {(booking.instructor as any).user.email}</p>
                            </div>
                        </div>
                        <span className='absolute right-3 top-3 rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white'>
                            Learner
                        </span>
                    </div>
                }
                {
                    role != "instructor" &&
                    <div className="bg-white p-4 rounded-lg border relative">
                        <div className="flex flex-col sm:flex-row items-center gap-4 ">
                            <div className="relative">
                                <Image
                                    width={64}
                                    height={64}
                                    src={(booking.instructor as any).user.profileImg || ""}
                                    alt="Instructor"
                                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary ring-offset-2"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full">
                                    <User className="w-4 h-4" />
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{(booking.instructor as any).user.name.fullName}</p>
                                <p className="text-sm font-medium text-primary/80">Email: {(booking.instructor as any).user.email}</p>
                            </div>
                        </div>
                        <span className='absolute right-3 top-3 rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white'>
                            Instructor
                        </span>
                    </div>
                }
            </div>

            {/* Booking Info */}
            <div className="grid gap-4 border-y py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Booking Hours:</span>
                    </div>
                    <span>{booking.bookingHours} hours</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Booked On:</span>
                    </div>
                    <span>{format(new Date(booking.createdAt), "PPP")}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-medium">Price per Hour:</span>
                    <span>${booking.price.paidAmount}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-medium">Total Amount:</span>
                    <span className="text-lg font-bold">${booking.price.paidAmount * booking.bookingHours}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-medium">Status:</span>
                    <span className='rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white'>
                        {firstLetterUppercase(booking.status)}
                    </span>
                </div>
            </div>

            {/* Schedules */}
            <div className="space-y-4">
                <h4 className="font-semibold">Scheduled Lessons</h4>
                {(booking?.schedules as ISchedule[]).map((schedule: ISchedule) => (
                    <div key={schedule._id} className='border rounded-md'>
                        <div className="p-4">
                            <div className="space-y-2">
                                <div className="flex items-start sm:items-center justify-between flex-col-reverse sm:flex-row gap-1">
                                    <div className="flex items-center space-x-2">
                                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                        <span>{format(new Date(schedule.date), "PPP")}</span>
                                    </div>
                                    <div className='space-x-2'>
                                        <span className='rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white'>
                                            {firstLetterUppercase(schedule.type)}
                                        </span>
                                        <span className='rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white'>
                                            {firstLetterUppercase(schedule.status)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>{schedule.time[0]}</span>
                                    <span> for {schedule.duration} {schedule.duration > 1 ? "Hours" : "Hour"}</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-start space-x-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">Pickup</p>
                                            <p className="text-sm text-muted-foreground">
                                                {schedule.pickupAddress.address}, {schedule.pickupAddress.suburb}
                                            </p>
                                        </div>
                                    </div>
                                    {schedule.dropOffAddress && (
                                        <div className="flex items-start space-x-2">
                                            <div className="w-4 flex justify-center">
                                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">Drop-off</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {schedule.dropOffAddress.address}, {schedule.dropOffAddress.suburb}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingDetails;