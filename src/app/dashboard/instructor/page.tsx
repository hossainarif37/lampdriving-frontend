import { FC } from 'react';
import InstructorStats from './components/instructor-stats/InstructorStats';

const InstructorStatsPage: FC = () => {
    return (
        <div className='bg-white rounded-xl min-h-[calc(100vh-117px)] flex flex-col text-primary'>
            <InstructorStats />
        </div>
    );
};

export default InstructorStatsPage;