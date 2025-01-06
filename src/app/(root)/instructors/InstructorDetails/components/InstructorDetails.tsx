import { FC } from 'react';
import InstructorInfo from "./InstructorInfo";
import OtherInstructors from "./OtherInstructors";
import Reviews from "./Reviews";
import Sidebar from "./Sidebar";
import { IInstructor } from "@/types/instructor";

interface InstructorInfoProps {
  instructor: IInstructor;
}
const nstructorDetails: FC<InstructorInfoProps> = async ({ instructor }) => {

  return (
    <div className="bg-gray-50">
      <main className="wrapper py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            <InstructorInfo instructor={instructor} />

            <Reviews />
            <div className="hidden md:block">
              <OtherInstructors />
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

export default nstructorDetails;
