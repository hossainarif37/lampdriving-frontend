import { FC, Suspense } from 'react';
import InstructorInfo from "./InstructorInfo";
import dynamic from 'next/dynamic';
const OtherInstructors = dynamic(() => import('./OtherInstructors'));
import Reviews from "./Reviews";
import Sidebar from "./Sidebar";
import { IInstructor } from "@/types/instructor";
import Loading from '@/components/shared/Loading';

interface InstructorInfoProps {
  instructor: IInstructor;
}

const InstructorDetails: FC<InstructorInfoProps> = async ({ instructor }) => {

  return (
    <div className="bg-light">
      <main className="wrapper py-8">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Main content */}
          <div className="md:col-span-7">
            <InstructorInfo instructor={instructor} />
          </div>

          {/* Sidebar */}
          <div className='md:col-span-5 md:row-span-5'>
            <Sidebar instructor={instructor} />
          </div>

          {/* //TODO: Need to implement dynamic reviews */}
          <div className='md:col-span-7'>
            <Suspense fallback={<Loading />}>
              <Reviews instructor={instructor} />
            </Suspense>
          </div>

          <div className="md:col-span-12">
            <Suspense fallback={<Loading />}>
              <OtherInstructors serviceAreas={instructor.serviceAreas} instructorId={instructor._id} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorDetails;
