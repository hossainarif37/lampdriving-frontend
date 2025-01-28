import { FC } from 'react';
import UpcomingBookingsTable from './components/UpcomingBookingsTable';
import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';

const PendingBookingPage: FC = () => {
    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-heading'>
                <h2 className='font-semibold text-2xl'>Upcoming Bookings</h2>
                <TableSearchFilter />
            </div>
            <UpcomingBookingsTable />
        </div>
    );
};

export default PendingBookingPage;