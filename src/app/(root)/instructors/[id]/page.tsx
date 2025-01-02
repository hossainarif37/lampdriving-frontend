import { FC } from 'react';
import InstructorDetails from "../InstructorDetails/components/InstructorDetails"

const page: FC = () => {
    return (
        <div>
            <InstructorDetails params={{ name: 'Instructor Name' }} instructor={null} />
        </div>
    );
};

export default page;