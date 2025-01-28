import React from 'react';
import InstructorPayoutsTable from './components/InstructorPayoutsTable';
import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';

const InstructorPayoutsPage = () => {
    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-heading'>
                <h2 className='font-semibold text-2xl'>Pending Instructor Payouts</h2>
                <TableSearchFilter />
            </div>
            <InstructorPayoutsTable />
        </div>
    );
};

export default InstructorPayoutsPage;