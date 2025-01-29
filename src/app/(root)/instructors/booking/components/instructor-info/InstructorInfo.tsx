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
                <div className='flex gap-x-4 relative'>
                    <div className='flex-shrink-0 size-[50px] sm:size-[70px] overflow-hidden rounded-full'>
                        <Image src={(instructor?.user as IUser)?.profileImg || placeholderUserImage} alt="Instructor" width={96} height={96} className="w-full h-full object-cover" />
                    </div>

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
                        <h3 className="font-medium">{instructor?.vehicle?.name} {instructor?.vehicle?.model} {instructor?.vehicle?.year} ({instructor?.vehicle?.type})</h3>
                        <p className="text-sm text-gray-600 mt-1">{instructor?.vehicle?.rating}-star ANCAP rating</p>
                    </div>

                    <div className='flex-shrink-0 size-[50px] sm:size-[70px] overflow-hidden rounded-full border shadow'>
                        <Image src={instructor?.vehicle?.image || placeholderCarImage} alt="Instructor" width={110} height={110}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorInfo;