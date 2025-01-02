
import Image from 'next/image'
import instructorImg from "@/assets/home-page-image/test-image.webp"
import carImg from "@/assets/dummy-images/e4d09a76-e66f-4c58-9910-783a39af0b55-Taisor-Car-Color-Image.webp"
import { CircleCheck } from 'lucide-react'

import { FC } from 'react';
import { IInstructor } from '@/types/instructor';
import { IUser } from '@/types/user';


interface InstructorInfoProps {
  instructor: IInstructor;
}
const InstructorInfo: FC<InstructorInfoProps> = ({ instructor }) => {
  const carInfo = [
    { id: 1, info: 'Auto Lessons & Test Packages' },
    { id: 2, info: 'Verified Working with Children Check' },
    { id: 3, info: 'Instructed for 15 yr 4 mo' },
  ];
  const user: IUser | undefined = typeof instructor.user != "string" ? instructor.user : undefined;

  return (
    <section className="bg-light rounded-xl border p-4 md:p-6 space-y-6">
      {/* Profile section */}
      <div className="flex items-start gap-6">
        <div className="relative flex-shrink-0">
          <Image
            src={instructorImg}
            alt="Instructor"
            width={120}
            height={120}
            className="rounded-full "
          />
          <Image
            src={carImg}
            alt="Vehicle"
            width={70}
            height={70}
            className="absolute -bottom-2 -right-2 rounded-full "
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{user?.name.fullName}</h1>
          <div className="flex md:flex-row flex-col md:items-center gap-1 mt-1">
            <div className="flex text-indigo">{'★'.repeat(5)}</div>
            <span className="text-sm text-accent ml-1">4.6 - 79 ratings</span>
          </div>
        </div>
      </div>

      {/* Instructor bio */}
      <div>
        <h2 className="font-semibold mb-2 text-secondary">Instructor Bio</h2>
        <p className="text-accent mb-4">
          Hi, my name is Arun. I started as a car driver over 10 years. This experience is invaluable and I&apos;m very passionate about teaching. I started teaching in 2015 with my focus on full-time teaching people to pass the test and drive safely. I always cover all laws related to NSW roads.
        </p>

        <div className="space-y-2 ">
          {carInfo.map(info => (
            <div key={info.id} className="flex items-center gap-2">
              <CircleCheck className='w-5 ' color='purple' />
              <span className="text-sm text-accent">{info.info}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Spoken languages */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-secondary">Spoken language(s)</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm gradient-color text-light">Bengali</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm gradient-color text-light">English</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm gradient-color text-light">Hindi</span>
        </div>
      </div>
    </section>
  )
};

export default InstructorInfo;
