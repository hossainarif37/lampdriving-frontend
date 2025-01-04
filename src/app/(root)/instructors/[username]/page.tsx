import { FC } from 'react';
import InstructorDetails from "../InstructorDetails/components/InstructorDetails"
import { getAInstructor } from '@/api/getAInstructor';

interface IInstructorPageProps {
    params: Promise<{
        username: string
    }>
}

const InstructorPage: FC<IInstructorPageProps> = async ({ params }) => {
    const { username } = await params;
    const data = await getAInstructor(username);

    return (
        <div>
            <InstructorDetails instructor={data.data} />
        </div>
    );
};

export default InstructorPage;