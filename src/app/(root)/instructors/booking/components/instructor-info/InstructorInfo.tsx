import Image from 'next/image';
import { FC } from 'react';
import { Star } from 'lucide-react';
import { useBooking } from '@/providers/BookingProvider';
import { IUser } from '@/types/user';
import { placeholderCarImage, placeholderUserImage } from '@/constant/placeholderImage';

const InstructorInfo: FC = () => {
    const { instructor } = useBooking();

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Instructor Info</h2>

            <div className="space-y-4 w-full">
                <div className='flex relative'>
                    <Image src={(instructor?.user as IUser)?.profileImg || placeholderUserImage} alt="Instructor" width={110} height={110} className="size-[50px] sm:size-[70px] rounded-full mr-4" />
                    <div className='w-full'>
                        <div className='flex flex-col sm:flex-row sm:items-center justify-between w-full'>
                            <h6 className='font-semibold'>
                                {typeof instructor?.user !== 'string' && instructor?.user?.name?.firstName}
                            </h6>
                            <div className="flex gap-1">
                                <div className="flex items-center gap-0.5">
                                    <Star className="size-5 text-primary fill-current" />
                                    <span>{instructor?.feedback?.rating ? instructor?.feedback?.rating : "N/A"}</span>
                                </div>
                                <span className="text-primary">•</span>
                                <span>{instructor?.feedback?.reviews.length ? instructor?.feedback?.reviews.length : 0} Ratings</span>
                            </div>
                        </div>

                        <p>${instructor?.pricePerHour}/hr</p>
                        <p>Offers 1 & 2hr lessons</p>
                        <p>{instructor?.completedLessons} Lessons Completed</p>
                    </div>

                </div>
                <hr />
                <div className='flex items-center justify-between '>
                    <div>
                        <h6 className='font-semibold'>
                            {`${instructor?.vehicle?.name} ${instructor?.vehicle?.model}`}
                            ({instructor?.vehicle?.type === 'auto' ? 'Auto' : 'Manual'})
                        </h6>
                        <p>{instructor?.vehicle?.rating}</p>
                        <p>Dual controls fitted</p>
                    </div>
                    <Image src={instructor?.vehicle?.image || placeholderCarImage} alt="Instructor" width={110} height={110}
                        className="size-[50px] sm:size-[70px] object-cover rounded-full bg-gray-100 border border-gray-200" />
                </div>
            </div>
        </div>
    );
};

export default InstructorInfo;