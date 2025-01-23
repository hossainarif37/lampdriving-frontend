"use client"
import { useGetABookingQuery } from '@/redux/api/bookingApi/bookingApi';
import { ISchedule } from '@/types/schedule';
import { format } from 'date-fns';
import { ArrowRight, CalendarDays, Clock, MapPin } from 'lucide-react';
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
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {
                    role !== "learner" &&
                    <div className={`flex items-start space-x-4 border rounded-md p-4 ${role && "col-span-2"}`}>
                        <div className="flex shrink-0 overflow-hidden rounded-full size-16">
                            <Image
                                className='object-cover'
                                src={(booking?.learner as any).user.profileImg}
                                width={100}
                                height={100}
                                alt={`${(booking?.learner as any).user.name.firstName[0]}'s image`} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{(booking.learner as any).user.name.fullName}</h3>
                            <p className="text-sm line-clamp-2 break-all">{(booking.learner as any).user.email}</p>
                            <span className='rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white'>
                                Learner
                            </span>
                        </div>
                    </div>
                }
                {
                    role != "instructor" &&
                    <div className={`flex items-start space-x-4 border rounded-md p-4 ${role && "col-span-2"}`}>
                        <div className="flex shrink-0 overflow-hidden rounded-full size-16">
                            <Image
                                className='object-cover'
                                src={(booking.instructor as any).user.profileImg}
                                width={100}
                                height={100}
                                alt={`${(booking.instructor as any).user.name.firstName[0]}'s image`} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{(booking.instructor as any).user.name.fullName}</h3>
                            <p className="text-sm line-clamp-2 break-all">{(booking.instructor as any).user.email}</p>
                            <span className='rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white'>
                                Instructor
                            </span>
                        </div>
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
                    <span>${booking.price}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-medium">Total Amount:</span>
                    <span className="text-lg font-bold">${booking.price * booking.bookingHours}</span>
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
                {(booking?.schedules as ISchedule[]).map((schedule: any) => (
                    <div key={schedule._id} className='border rounded-md'>
                        <div className="p-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
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
                                    <span>{schedule.time.join(" - ")}</span>
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