import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';
import { FC } from 'react';
import CancelledBookingsTable from './components/CancelledBookingsTable';

const CancelledBookingsPage: FC = () => {
    return (
        <div className='bg-white rounded-xl min-h-[calc(100vh-117px)] flex flex-col text-secondary'>
            <div className='py-4 px-5 flex items-center justify-between'>
                <h2 className='font-semibold text-2xl'>Cancelled Bookings</h2>
                <TableSearchFilter />
            </div>
            <CancelledBookingsTable />
        </div>
    );
};

export default CancelledBookingsPage;