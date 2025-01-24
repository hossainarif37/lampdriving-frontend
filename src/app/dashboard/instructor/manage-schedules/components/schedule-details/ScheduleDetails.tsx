
import { useGetAScheduleQuery } from '@/redux/api/scheduleApi/scheduleApi';
import { FC } from 'react';
import ScheduleDetailsSkeleton from './ScheduleDetailsSkeleton';
import { Calendar, Clock, DollarSign, MapPin, User } from 'lucide-react';
import { format } from 'date-fns';
import { firstLetterUppercase } from '@/utils/firstLetterUppercase';

interface IScheduleDetailsProps {
    role?: 'instructor' | 'learner';
    id: string;
}

const ScheduleDetails: FC<IScheduleDetailsProps> = ({ role, id }) => {
    const { data, isLoading } = useGetAScheduleQuery({ id })
    const schedule = data?.data

    if (isLoading)
        return <ScheduleDetailsSkeleton />

    if (!schedule) return <div className='flex justify-center items-center h-96 px-2 py-4'>
        <h1>No Schedule Data Found</h1>
    </div>;
    return (
        <div className="space-y-6 h-96 overflow-y-auto thin-scrollbar px-2 py-4">
            {/* Participants */}
            <div className={`grid ${!role && "md:grid-cols-2"} gap-6`}>
                {
                    role === "learner" &&
                    <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-4 relative">
                            <div className="relative">
                                <img
                                    src={(schedule.instructor as any).user.profileImg}
                                    alt="Instructor"
                                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary ring-offset-2"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full">
                                    <User className="w-4 h-4" />
                                </div>
                            </div>
                            <div>
                                <span className='absolute right-3 top-3 rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white'>
                                    Instructor
                                </span>
                                <p className="font-semibold text-gray-900">{(schedule.instructor as any).user.name.fullName}</p>
                                <p className="text-sm font-medium text-primary/80">Email: {(schedule.instructor as any).user.email}</p>
                            </div>
                        </div>
                    </div>
                }
                {
                    role === "instructor" &&
                    <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-4 relative">
                            <div className="relative">
                                <img
                                    src={(schedule.learner as any).user.profileImg}
                                    alt="Learner"
                                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary ring-offset-2"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full">
                                    <User className="w-4 h-4" />
                                </div>
                            </div>
                            <div>
                                <span className='absolute right-3 top-3 rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white'>
                                    Learner
                                </span>
                                <p className="font-semibold text-gray-900">{(schedule.instructor as any).user.name.fullName}</p>
                                <p className="text-sm font-medium text-primary/80">Email: {(schedule.instructor as any).user.email}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className={`border rounded-xl p-4 ${!schedule.dropOffAddress && "col-span-2"}`}>
                    <div className="flex items-start gap-3">
                        <div className="mt-1">
                            <MapPin className="size-5 text-gray-600" />
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900">Pickup Location</h4>
                            <p className="text-gray-600">{schedule.pickupAddress.address}</p>
                            <p className="text-gray-600">{schedule.pickupAddress.suburb}</p>
                        </div>
                    </div>
                </div>
                {
                    schedule.dropOffAddress &&
                    <div className="border rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-1">
                                <MapPin className="size-5 text-gray-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Drop Off Location</h4>
                                <p className="text-gray-600">{schedule.pickupAddress.address}</p>
                                <p className="text-gray-600">{schedule.pickupAddress.suburb}</p>
                            </div>
                        </div>
                    </div>
                }

                <div className="border rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <div className="mt-1">
                            <Calendar className="size-5 text-gray-600" />
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900">Date</h4>
                            <p className="text-gray-600">{format(new Date(schedule.date), "PPP")}</p>
                        </div>
                    </div>
                </div>

                <div className="border rounded-xl p-4 relative">
                    <div className="flex items-start gap-3">
                        <div className="mt-1">
                            <Clock className="size-5 text-gray-600" />
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900">Time</h4>
                            <p className="text-gray-600">{schedule.time[0]}</p>
                            <p className="text-gray-600">{schedule.duration} hours duration</p>
                        </div>
                    </div>
                    <span className='absolute right-3 top-3 rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-white'>
                        {firstLetterUppercase(schedule.status)} {firstLetterUppercase(schedule.type)}
                    </span>
                </div>
                <div className="border rounded-xl p-4 relative">
                    <div className="flex items-start gap-3">
                        <div className="mt-1">
                            <DollarSign className="size-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-900">Booking Information</h4>
                            <div className="mt-1 space-y-1">
                                <p className="text-gray-600">Price: ${(schedule.booking as any).price}</p>
                                {
                                    (schedule.booking as any).bookingHours &&
                                    <p className="text-gray-600">Total Credit: {(schedule.booking as any).bookingHours} hours</p>

                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border rounded-xl p-4 relative">
                    <div className="flex items-start gap-3">
                        <div className="mt-1">
                            <DollarSign className="size-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-900">License Information</h4>
                            <div className="mt-1 space-y-1">
                                <p className="text-gray-600">License Number: {(schedule?.learner as any)?.localLicense?.licenseNumber}</p>
                                <p className="text-gray-600">Issue Date: {(schedule?.learner as any)?.localLicense?.issueDate}</p>
                                <p className="text-gray-600">Expiry Date: {(schedule?.learner as any)?.localLicense.expiryDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ScheduleDetails;