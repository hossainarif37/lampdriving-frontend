import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';
import TransactionHistoryTable from '@/app/dashboard/components/shared/TransactionHistoryTable';
import { FC } from 'react';

const TransactionHistoryPage: FC = () => {

    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-heading'>
                <h2 className='font-semibold text-2xl'>Transaction History</h2>
                <TableSearchFilter />
            </div>
            <TransactionHistoryTable />
        </div>
    );
};

export default TransactionHistoryPage;