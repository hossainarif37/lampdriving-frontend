import { FC } from 'react';
import PendingBookingsTable from './components/PendingBookingsTable';
import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';

const PendingBookingPage: FC = () => {
    return (
        <div className='bg-white rounded-xl min-h-[calc(100vh-117px)] flex flex-col text-secondary'>
            <div className='py-4 px-5 flex items-center justify-between'>
                <h2 className='font-semibold text-2xl'>Pending Bookings</h2>
                <TableSearchFilter />
            </div>
            <PendingBookingsTable />
        </div>
    );
};

export default PendingBookingPage;