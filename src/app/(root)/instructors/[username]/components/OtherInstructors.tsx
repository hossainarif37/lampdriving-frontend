import Image from 'next/image'
import IImg from "@/assets/home-page-image/test-image.webp"


import * as React from "react"

import {
  Carousel,
  CarouselContent,
} from "@/components/ui/carousel"

import { FC } from 'react';

const OtherInstructors: FC = () => {
  const instructors = [
    { id: 1, name: 'Kim' },
    { id: 2, name: 'Steve' },
    { id: 3, name: 'Ahmad' },
    { id: 4, name: 'Jennifer' },
    { id: 5, name: 'Lee-min' },
    { id: 6, name: 'Chandrika' },
    { id: 7, name: 'Daniel' },
  ]

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full bg-white rounded-xl border p-6"
    >
      <h2 className="text-xl font-semibold mb-6">Other instructors in BANKSIA, 2216</h2>
      <CarouselContent className="">
        {instructors.map((instructor) => (
          <div key={instructor.id} className="text-center felx w-full px-6">
            <div className="relative w-24 h-24 mx-auto mb-1">
              <Image
                src={IImg}
                alt={instructor.name}
                width={200}
                height={200}
                className="rounded-full object-cover"
              />
            </div>
            <p className="text-xs text-accent font-medium">{instructor.name}</p>
          </div>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default OtherInstructors;
