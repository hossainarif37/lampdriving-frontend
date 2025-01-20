import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';
import { FC } from 'react';
import RefundedBookingsTable from './components/RefundedBookingsTable';

const CancelledBookingsPage: FC = () => {
    return (
        <div className='bg-white rounded-xl min-h-[calc(100vh-117px)] flex flex-col text-primary'>
            <div className='py-4 px-5 flex items-center justify-between'>
                <h2 className='font-semibold text-2xl'>Refunded Bookings</h2>
                <TableSearchFilter />
            </div>
            <RefundedBookingsTable />
        </div>
    );
};

export default CancelledBookingsPage;