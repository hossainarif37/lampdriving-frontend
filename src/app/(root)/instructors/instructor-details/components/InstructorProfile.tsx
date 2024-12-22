import InstructorInfo from "./InstructorInfo";
import OtherInstructors from "./OtherInstructors";
import Reviews from "./Reviews";
import Sidebar from "./Sidebar";


export default function InstructorProfile() {
  return (
    <div className="bg-gray-50">
      <main className=" wrapper py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <InstructorInfo />
            <Reviews />
            <OtherInstructors />
          </div>
          <div>
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  )
}

