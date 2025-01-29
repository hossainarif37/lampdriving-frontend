import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';
import { FC } from 'react';
import BlockedInstructorsTable from './components/BlockedInstructorsTable';

const BlockedInstructorsPage: FC = () => {
    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-heading'>
                <h2 className='font-semibold text-2xl'>Blocked Instructors</h2>
                <TableSearchFilter />
            </div>
            <BlockedInstructorsTable />
        </div>
    );
};

export default BlockedInstructorsPage;