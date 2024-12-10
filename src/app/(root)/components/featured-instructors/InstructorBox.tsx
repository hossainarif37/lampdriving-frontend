import Image from 'next/image';
import { FC } from 'react';
import myImg from "@/assets/home-page-image/test-image.avif";
import { Button } from '@/components/ui/button';

const InstructorBox: FC = () => {
    return (
        <div className="border text-secondary flex flex-col gap-4 p-4">
            {/* Instructor Image */}
            <Image
                src={myImg}
                width={200}
                height={200}
                alt="Instructor image"
                className="rounded-full mx-auto w-24 h-24"
            />

            {/* Instructor Details */}
            <div className="flex justify-between">
                <div>
                    <p><strong>Name:</strong> John Doe</p>
                    <p><strong>Rating:</strong> 4.8/5</p>
                    <p><strong>Experience:</strong> 5 years</p>
                    <p><strong>Type:</strong> Auto/Manual</p>
                </div>
                <div>
                    <h4 className="font-bold text-xl">
                        $50<span className="text-primary">/hour</span>
                    </h4>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <Button className="w-1/2 bg-secondary hover:bg-secondary h-11">
                    View Profile
                </Button>
                <Button className="w-1/2 h-11 text-accent">
                    Book Online Now
                </Button>
            </div>
        </div>
    );
};

export default InstructorBox;
