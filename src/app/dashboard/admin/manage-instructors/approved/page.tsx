import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';
import { FC } from 'react';
import ApprovedInstructorsTable from './components/ApprovedInstructorsTable';

const ApprovedInstructorsPage: FC = () => {
    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-heading'>
                <h2 className='font-semibold text-2xl'>Approved Instructors</h2>
                <TableSearchFilter />
            </div>
            <ApprovedInstructorsTable />
        </div>
    );
};

export default ApprovedInstructorsPage;