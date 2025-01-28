import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';
import { FC } from 'react';
import LearnerBookingsTable from './components/LeanerBookingsTable';


const LearnerBookingsPage: FC = () => {
    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-heading'>
                <h2 className='font-semibold text-2xl'>Learner Bookings</h2>
                <TableSearchFilter />
            </div>
            <LearnerBookingsTable />
        </div>
    );
};

export default LearnerBookingsPage;