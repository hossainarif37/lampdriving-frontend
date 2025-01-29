import { FC } from 'react';
import LearnersTable from './components/LearnersTable';
import TableSearchFilter from '../../components/shared/TableSearchFilter';
import FilterUserStatus from './components/FilterUserStatus';

const ManageLearnersPage: FC = () => {
    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-heading'>
                <h2 className='font-semibold text-2xl'>Learners</h2>
                <div className='flex gap-3'>
                    <TableSearchFilter />
                    <FilterUserStatus />
                </div>
            </div>
            <LearnersTable />
        </div>
    );
};

export default ManageLearnersPage;