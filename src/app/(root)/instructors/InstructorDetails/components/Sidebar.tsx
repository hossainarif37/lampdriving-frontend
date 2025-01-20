"use client"
import { FC, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import carImg from "@/assets/dummy-images/e4d09a76-e66f-4c58-9910-783a39af0b55-Taisor-Car-Color-Image.webp";
import { IInstructor } from '@/types/instructor';
import { IUser } from '@/types/user';
import ServiceAreaMap from './ServiceAreaMap';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const CheckAvailability = dynamic(
  () => import('../../components/shared/check-availability/CheckAvailability'),
  {
    loading: () => (
      <Button
        className="w-full py-3 px-4 bg-light border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
      >
        Checking Availability
      </Button>
    ),
    ssr: false
  }
);

interface InstructorInfoProps {
  instructor: IInstructor;
}
const Sidebar: FC<InstructorInfoProps> = ({ instructor }) => {
  const [showAvailability, setShowAvailability] = useState(false);
  const user: IUser | undefined = typeof instructor?.user != "string" ? instructor?.user : undefined;
  const { pricePerHour, vehicle } = instructor;
  console.log(instructor);


  return (
    <div className="space-y-6">

      {/* Hourly Price Section */}
      <section className="bg-white rounded-xl border p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4 text-primary">Hourly Price</h2>
        <div className="flex flex-col gap-4">
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
          <Link href={`/instructors/booking/?instructor=${user?.username}&step=package-selection`}>
            <Button className="w-full gradient-color">Book Now</Button>
          </Link>

          <div className="text-center flex items-center justify-center">
            {showAvailability ? (
              <CheckAvailability
                showAvailability={showAvailability}
                setShowAvailability={setShowAvailability}
                workingHours={instructor.workingHour}
                name={user?.name.firstName || ""}
                username={user?.username || ""}
                id={instructor._id || ""}
              />
            ) : (
              <Button
                onClick={() => setShowAvailability(true)}
                className="w-full py-3 px-4 bg-light border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Check Availability
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Vehicle Information Section */}
      <section className="bg-light rounded-xl border p-4 md:p-6 text-primary">
        <h2 className="text-lg font-semibold mb-4">{user?.name?.firstName}&apos;s vehicle</h2>
        <div className="space-y-4">
          {/* Displaying vehicle image */}
          <div className="aspect-video relative rounded-lg overflow-hidden cursor-pointer">
            <Image
              src={vehicle?.image}
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
    </div>
  );
};

export default Sidebar;
