import Image from 'next/image';
import { FC } from 'react';
import myImg from "@/assets/home-page-image/image-highlighted-section-bg.jpg"

const InstructorBox: FC = () => {
    return (
        <div className='border text-secondary p-3 flex flex-col gap-4'>
            <Image src={myImg} width={100} height={100} alt='instructor image' priority={false} className='rounded-full mx-auto' />
            <div className='flex justify-between'>
                <div>
                    <p><strong>Name:</strong> John Doe</p>
                    <p><strong>Rating:</strong> 4.8/5</p>
                    <p><strong>Experience:</strong> 5 years</p>
                    <p><strong>Auto/Menual</strong></p>
                </div>
                <div>
                    <h4 className='font-bold text-xl'>$50/hour</h4>
                </div>
            </div>
        </div>
    );
};

export default InstructorBox;