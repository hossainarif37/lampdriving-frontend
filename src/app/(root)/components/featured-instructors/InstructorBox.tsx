import Image from 'next/image';
import { FC } from 'react';
import myImg from "@/assets/home-page-image/test-image.webp";
import { Button } from '@/components/ui/button';

const InstructorBox: FC = () => {
    return (
        <div className=" rounded-md text-secondary flex flex-col gap-4 px-4 py-6 bg-light">
            {/* Instructor Image */}
            <div className=' rounded-full mx-auto'>
                <Image
                    src={myImg}
                    width={120}
                    height={120}
                    alt="Instructor image"
                    className="rounded-full"
                />
            </div>

            {/* Instructor Details */}
            <div className="flex justify-between">
                <div className='space-y-1'>
                    <p><strong>Name:</strong> John Doe</p>
                    <p><strong>Rating:</strong> 4.8/5</p>
                    <p><strong>Experience:</strong> 5 years</p>
                    <p><strong>Type:</strong> Auto/Manual</p>
                </div>
                <div>
                    <h4 className="font-bold text-xl bg-gradient-to-r from-primary to-indigo bg-clip-text text-transparent">
                        $50/<span className="text-sm">hr</span>
                    </h4>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <Button className="w-1/2 bg-light border hover:bg-gray-100 text-secondary h-11">
                    View Profile
                </Button>
                <Button className="w-1/2 h-11 text-light bg-gradient-to-r gradient-color">
                    Book Online Now
                </Button>
            </div>
        </div>
    );
};

export default InstructorBox;
