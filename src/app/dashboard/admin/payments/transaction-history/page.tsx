"use client"

import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';
import { FC } from 'react';
import TransactionHistoryTable from './components/TransactionHistoryTable';

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