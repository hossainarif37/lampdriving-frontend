import { FC } from 'react';
import PendingInstructorsTable from './components/PendingInstructorsTable';
import TableSearchFilter from '../../../components/shared/TableSearchFilter';

const PendingInstructorsPage: FC = () => {
    return (
        <div className='bg-white rounded-xl min-h-[calc(100vh-117px)] flex flex-col text-secondary'>
            <div className='py-4 px-5 flex items-center justify-between'>
                <h2 className='font-semibold text-2xl'>Pending Instructors</h2>
                <TableSearchFilter />
            </div>
            <PendingInstructorsTable />
        </div>
    );
};

export default PendingInstructorsPage;