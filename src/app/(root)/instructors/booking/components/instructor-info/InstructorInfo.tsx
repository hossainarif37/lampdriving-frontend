import Image from 'next/image';
import { FC } from 'react';
import cardImg from "@/assets/home-page-image/test-image.webp";
import carImg from "@/assets/car-image/carimg.jpg";
import { Star } from 'lucide-react';
import { useBooking } from '@/providers/BookingProvider';

const InstructorInfo: FC = () => {
    const { instructor } = useBooking();

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Instructor Info</h2>

            <div className="space-y-4">
                <div className='flex relative'>
                    <Image src={cardImg} alt="Instructor" width={110} height={110} className="size-[70px] rounded-full mr-4" />
                    <div>
                        <h6 className='font-semibold'>
                            {typeof instructor?.user !== 'string' && instructor?.user?.name?.firstName}
                        </h6>
                        <p>${instructor?.pricePerHour}/hr</p>
                        <p>Offers 1 & 2hr lessons</p>
                        <p>{instructor?.completedLessons} Lessons Completed</p>
                    </div>
                    <div className="flex gap-1 absolute top-0 right-0">
                        <div className="flex items-center gap-1">
                            <Star className="size-5 text-primary fill-current" />
                            <span>{instructor?.feedback?.rating ? instructor?.feedback?.rating : "N/A"}</span>
                        </div>
                        <span className="text-primary">•</span>
                        <span>{instructor?.feedback?.reviews.length ? instructor?.feedback?.reviews.length : 0} Ratings</span>
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
                    <Image src={carImg} alt="Instructor" width={110} height={110}
                        className="size-[70px] object-cover rounded-full bg-gray-100 border border-gray-200" />
                </div>
            </div>
        </div>
    );
};

export default InstructorInfo;