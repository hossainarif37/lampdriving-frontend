import { getInstructorByName, getInstructors } from "@/api/getInstructors";
import InstructorInfo from "./InstructorInfo";
import OtherInstructors from "./OtherInstructors";
import Reviews from "./Reviews";
import Sidebar from "./Sidebar";

import { FC } from 'react';
import { IInstructor } from "@/types/instructor";
// interface IInstructorProps {
//   searchedParams?: {
//     carType?: string;
//     searchKey?: string;
//     page?: string;
//   };
// }

// interface IInstructorProps {
//   params: {
//     name: string;
//   };
// }

interface InstructorInfoProps {
  params: {
    name: string;
  };
  instructor: IInstructor | null;
}
const nstructorDetails: FC<InstructorInfoProps> = async ({ params }) => {

  console.log("Params received:", params);
  const instructor = await getInstructorByName(params.name);

  console.log(instructor);
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
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default nstructorDetails;
