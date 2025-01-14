import React from 'react';
import InstructorPayoutsTable from './components/InstructorPayoutsTable';
import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';


const InstructorPayoutsPage = () => {
    return (
        <div className='bg-white rounded-xl min-h-[calc(100vh-117px)] flex flex-col text-primary'>
            <div className='py-4 px-5 flex items-center justify-between'>
                <h2 className='font-semibold text-2xl'>Pending Instructor Payouts</h2>
                <TableSearchFilter />
            </div>
            <InstructorPayoutsTable />
        </div>
    );
};

export default InstructorPayoutsPage;