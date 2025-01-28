import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';
import { FC } from 'react';
import OngoingBookingsTable from './components/OngoingBookingsTable';

const OngoingBookingsPage: FC = () => {
    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-heading'>
                <h2 className='font-semibold text-2xl'>Ongoing Bookings</h2>
                <TableSearchFilter />
            </div>
            <OngoingBookingsTable />
        </div>
    );
};

export default OngoingBookingsPage;