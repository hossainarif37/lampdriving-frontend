import { FC } from 'react';
import PendingInstructorsTable from './components/PendingInstructorsTable';
import TableSearchFilter from '../../../components/shared/TableSearchFilter';

const PendingInstructorsPage: FC = () => {
    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-heading'>
                <h2 className='font-semibold text-2xl'>Pending Instructors</h2>
                <TableSearchFilter />
            </div>
            <PendingInstructorsTable />
        </div>
    );
};

export default PendingInstructorsPage;