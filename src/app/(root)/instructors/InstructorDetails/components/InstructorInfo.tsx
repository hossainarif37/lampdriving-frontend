"use client"
import Image from 'next/image'
import instructorImg from "@/assets/home-page-image/test-image.webp"
import carImg from "@/assets/dummy-images/e4d09a76-e66f-4c58-9910-783a39af0b55-Taisor-Car-Color-Image.webp"
import { CircleCheck, User } from 'lucide-react'

import { FC, useState } from 'react';
import { IInstructor } from '@/types/instructor';
import { IUser } from '@/types/user';


interface InstructorInfoProps {
  instructor: IInstructor;
}
const InstructorInfo: FC<InstructorInfoProps> = ({ instructor }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const user: IUser | undefined = typeof instructor.user != "string" ? instructor.user : undefined;
  const profileImg = typeof instructor.user !== 'string' ? instructor.user?.profileImg : null;
  console.log(profileImg);

  const carInfo = [
    { id: 1, info: 'Auto Lessons & Test Packages' },
    { id: 2, info: 'Verified Working with Children Check' },
    { id: 3, info: 'Instructed for 15 yr 4 mo' },
  ];


  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Split the description into words
  const words = instructor.description.split(" ");
  const truncatedDescription = words?.slice(0, 40).join(" ");
  const descriptionLength = words?.length;


  return (
    <section className="bg-light rounded-xl border p-4 md:p-6 space-y-6">
      {/* Profile section */}
      <div className="flex items-start gap-6">
        <div className="relative flex-shrink-0">
          <div className='w-[120px] h-[120px] rounded-full overflow-hidden shadow-lg border flex items-center justify-center text-accent'>
            {
              profileImg ?
                <Image src={profileImg} alt="Instructor" className='w-full' width={120} height={120} />
                :
                <User size={60} />
            }
          </div>

          <Image
            src={carImg}
            alt="Vehicle"
            width={70}
            height={70}
            className="absolute -bottom-2 -right-2 rounded-full"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{user?.name.fullName}</h1>
          <div className="flex md:flex-row flex-col md:items-center gap-1 mt-1">
            <div className="flex text-gradient">{'★'.repeat(5)}</div>
            <span className="text-sm text-accent ml-1">4.6 - 79 ratings</span>
          </div>
        </div>
      </div>

      {/* Instructor bio */}
      <div>
        <h2 className="font-semibold mb-2 text-primary">Instructor Bio</h2>
        <p className="text-accent mb-4" onClick={toggleDescription}>
          {isExpanded ? instructor.description : `${truncatedDescription}...`}{" "}
          {descriptionLength > 40 && (<span className="text-primary cursor-pointer">
            {isExpanded ? "Show less" : "Show more"}
          </span>)}
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
        <h3 className="text-sm font-medium mb-2 text-primary">Spoken language(s)</h3>
        <div className="flex flex-wrap gap-2">
          {
            instructor.languages.map((language, index) => (

              <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm gradient-color text-light">{language}</span>
            ))
          }
        </div>
      </div>
    </section>
  )
};

export default InstructorInfo;
