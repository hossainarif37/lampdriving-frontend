import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';
import { FC } from 'react';
import ManageSchedulesTable from './components/ManageSchedulesTable';

const ManageSchedulesPage: FC = () => {
    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-heading'>
                <h2 className='font-semibold text-2xl'>Manage Schedules</h2>
                <TableSearchFilter />
            </div>
            <ManageSchedulesTable />
        </div>
    );
};

export default ManageSchedulesPage;