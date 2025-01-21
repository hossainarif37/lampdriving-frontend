import TableSearchFilter from '@/app/dashboard/components/shared/TableSearchFilter';
import { FC } from 'react';
import ManageSchedulesTable from './components/ManageSchedulesTable';

const ManageSchedulesPage: FC = () => {
    return (
        <div className='bg-white rounded-xl min-h-[calc(100vh-117px)] flex flex-col text-primary'>
            <div className='py-4 px-5 flex items-center justify-between'>
                <h2 className='font-semibold text-2xl'>Manage Schedules</h2>
                <TableSearchFilter />
            </div>
            <ManageSchedulesTable />
        </div>
    );
};

export default ManageSchedulesPage;