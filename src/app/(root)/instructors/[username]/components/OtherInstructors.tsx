"use client";

import Image from 'next/image';
import IImg from "@/assets/home-page-image/test-image.webp";
import * as React from "react";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { FC } from 'react';
import { useGetInstructorsByServiceAreasQuery } from '@/redux/api/instructorApi/instructorApi';
import Loading from '@/components/shared/Loading';
import OtherInstructorSkeleton from './OtherInstructorSkeleton';
import DataNotFound from '@/components/shared/DataNotFound';
import { useRouter } from 'next/navigation';

interface IOtherInstructorsProps {
  serviceAreas: string[];
  instructorId: string | undefined;
}

const OtherInstructors: FC<IOtherInstructorsProps> = ({ serviceAreas, instructorId }) => {
  const router = useRouter();
  const { data: instructorsResponse, isLoading, isError } = useGetInstructorsByServiceAreasQuery(serviceAreas);

  if (isLoading) return <OtherInstructorSkeleton />

  const instructors = instructorsResponse?.data?.result || [];
  if (instructors.length === 0) {
    return <h1 className='text-xl text-center py-10 text-primary'>In this service area there are no other instructors!</h1>;
  }
  const filteredInstructors = instructors.filter((instructor: any) => instructor?._id !== instructorId);

  // Function to handle navigation
  const handleInstructorClick = (username: string) => {
    router.push(`/instructors/${username}`);
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full bg-white rounded-xl border p-6"
    >
      <h2 className="text-xl font-semibold mb-6">Other instructors in the same service area</h2>
      <CarouselContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {filteredInstructors.map((instructor: any) => (
          <div
            key={instructor?._id}
            className="flex flex-col items-center gap-y-2 w-full px-6 hover:scale-[.97] duration-100 cursor-pointer"
            onClick={() => handleInstructorClick(instructor?.user?.username)}
          >
            <div className="w-24 h-24 overflow-hidden rounded-full">
              <Image
                src={instructor?.user?.profileImg}
                alt={instructor?.user?.name?.fullName}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-accent font-medium text-nowrap">{instructor?.user?.name?.fullName}</p>
          </div>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default OtherInstructors;