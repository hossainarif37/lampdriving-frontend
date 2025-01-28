import { FC } from 'react';
import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';
import UpcomingBookingsTable from './components/UpcomingBookingsTable';

const UpcomingBookingPage: FC = () => {
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

export default UpcomingBookingPage;