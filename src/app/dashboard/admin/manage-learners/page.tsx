import { FC } from 'react';
import LearnersTable from './components/LearnersTable';
import TableSearchFilter from '../../components/shared/TableSearchFilter';

const ManageLearnersPage: FC = () => {
    return (
        <div className='bg-white rounded-xl min-h-[calc(100vh-117px)] flex flex-col text-primary'>
            <div className='py-4 px-5 flex items-center justify-between'>
                <h2 className='font-semibold text-2xl'>Learners</h2>
                <TableSearchFilter />
            </div>
            <LearnersTable />
        </div>
    );
};

export default ManageLearnersPage;