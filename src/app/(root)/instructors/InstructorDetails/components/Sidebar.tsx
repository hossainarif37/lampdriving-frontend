"use client"
import { FC, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import carImg from "@/assets/dummy-images/e4d09a76-e66f-4c58-9910-783a39af0b55-Taisor-Car-Color-Image.webp";
import carImg2 from "@/assets/dummy-images/map-image.jpg";
import { IInstructor } from '@/types/instructor';
import { IUser } from '@/types/user';
import AvailabilityModal from './AvailabilityModal';
import ServiceAreaMap from './ServiceAreaMap';
import CheckAvailability from '../../components/shared/check-availability/CheckAvailability';


interface InstructorInfoProps {
  instructor: IInstructor;
}
const Sidebar: FC<InstructorInfoProps> = ({ instructor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user: IUser | undefined = typeof instructor?.user != "string" ? instructor?.user : undefined;

  //  function for open the image in a new tab 
  const openImageInNewTab = () => {
    window.open(instructor.vehicle.image);
  };
  return (
    <div className="space-y-6">

      {/* Hourly Price Section */}
      <section className="bg-white rounded-xl border p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4 text-primary">Hourly Price</h2>
        <div className="space-y-4">
          {/* Pricing and available lesson durations */}
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-accent">Offers 1 & 2hr lessons</span>
            <span className="text-2xl font-bold text-gradient">{instructor?.pricePerHour}<span className='text-sm'>/hr</span></span>
          </div>

          {/* Discount details for longer lessons */}
          <div className="space-y-2 text-primary">
            <div className="flex items-center justify-between text-sm">
              <span>6hrs or more</span>
              <span className="text-green-500 font-medium">SAVE 5%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>10hrs or more</span>
              <span className="text-green-500 font-medium">SAVE 10%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Test Package (2.5 hrs)</span>
              <span>$225</span>
            </div>
          </div>

          {/* Booking buttons */}
          <Button className="w-full gradient-color">Book Now</Button>
          <CheckAvailability
            parent={"details"}
            id={instructor?._id || ""}
            name={user?.name?.firstName || ""}
            username={user?.username || ""}
            workingHours={instructor?.workingHour} />
        </div>
      </section>

      {/* Vehicle Information Section */}
      <section className="bg-light rounded-xl border p-4 md:p-6 text-primary">
        <h2 className="text-lg font-semibold mb-4">{user?.name?.firstName}&apos;s vehicle</h2>
        <div className="space-y-4">
          {/* Displaying vehicle image */}
          <div className="aspect-video relative rounded-lg overflow-hidden cursor-pointer">
            <Image
              onClick={openImageInNewTab}
              src={carImg}
              alt="Toyota Yaris 2018"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{instructor.vehicle.name} {instructor.vehicle.model}({instructor.vehicle.type})</h3>
            <p className="text-sm text-gray-600 mt-1">{instructor.vehicle.rating}</p>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="bg-white rounded-xl border">
        <div className="aspect-video relative rounded-lg ">

          <ServiceAreaMap serviceAreas={instructor.serviceAreas} />
        </div>
      </section>
      <AvailabilityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Sidebar;
