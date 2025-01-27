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
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            <InstructorInfo instructor={instructor} />

            {/* //TODO: Need to implement dynamic reviews */}
            <Reviews />
            <div className="hidden md:block">
              <Suspense fallback={<Loading />}>
                <OtherInstructors serviceAreas={instructor.serviceAreas} instructorId={instructor._id} />
              </Suspense>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <Sidebar instructor={instructor} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorDetails;
