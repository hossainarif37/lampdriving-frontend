import { FC } from 'react';
import InstructorDetails from "../InstructorDetails/components/InstructorDetails"

// interface IInstructorPageProps {
//     username: string
// }

const InstructorPage: FC = () => {
    // console.log(username);
    return (
        <div>
            <InstructorDetails params={{ name: 'Instructor Name' }} instructor={null} />
        </div>
    );
};

export default InstructorPage;