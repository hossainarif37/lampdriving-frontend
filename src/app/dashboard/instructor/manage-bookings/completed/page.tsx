import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';
import { FC } from 'react';
import CompletedBookingsTable from './components/CompletedBookingsTable';

const CompletedBookingsPage: FC = () => {
    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-heading'>
                <h2 className='font-semibold text-2xl'>Completed Bookings</h2>
                <TableSearchFilter />
            </div>
            <CompletedBookingsTable />
        </div>
    );
};

export default CompletedBookingsPage;