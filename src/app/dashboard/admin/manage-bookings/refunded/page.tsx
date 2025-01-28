import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';
import { FC } from 'react';
import RefundedBookingsTable from './components/RefundedBookingsTable';

const CancelledBookingsPage: FC = () => {
    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-heading'>
                <h2 className='font-semibold text-2xl'>Refunded Bookings</h2>
                <TableSearchFilter />
            </div>
            <RefundedBookingsTable />
        </div>
    );
};

export default CancelledBookingsPage;