import { FC } from 'react';
import InstructorDetails from "./components/InstructorDetails"
import { getAInstructor } from '@/api/getAInstructor';
import { envConfigs } from '@/configs/envConfigs';
import { IResponseWithPaginationData } from '@/types/response';
import { IInstructor } from '@/types/instructor';
import { IUser } from '@/types/user';

interface IInstructorPageProps {
    params: Promise<{
        username: string
    }>
}

export const generateStaticParams = async () => {
    try {
        const res = await fetch(
            `${envConfigs.apiUrl}/instructor/verified?populate=user&limit=16`,
            { next: { revalidate: 3600 } }
        );

        if (!res.ok) {
            return [];
        }

        const data: IResponseWithPaginationData<IInstructor[]> = await res.json();
        return data.data.result.map((instructor: IInstructor) => ({
            username: (instructor.user as any as IUser).username
        }));
    } catch (error) {
        return [];
    }
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