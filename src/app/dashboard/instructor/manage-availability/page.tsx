import { FC } from 'react';
import ManageAvailability from './components/ManageAvailability';

const ManageAvailabilityPage: FC = () => {
    return (
        <div className='bg-white rounded-xl min-h-[calc(100vh-117px)] flex flex-col text-primary'>
            <div className='py-4 px-5 flex items-center justify-between'>
                <h2 className='font-semibold text-2xl'>Manage Availability</h2>
            </div>
            <ManageAvailability />
        </div>
    );
};

export default ManageAvailabilityPage;