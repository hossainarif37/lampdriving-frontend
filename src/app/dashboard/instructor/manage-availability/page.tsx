import { FC } from 'react';
import ManageAvailability from './components/ManageAvailability';
import ManageWorkingHours from './components/ManageWorkingHours';

const ManageAvailabilityPage: FC = () => {
    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-heading'>
                <h2 className='font-semibold text-2xl'>Manage Availability</h2>
            </div>
            <div className='grid grid-cols-12 gap-6 px-5 py-4'>
                <div className='col-span-8'>
                    <ManageAvailability />
                </div>
                <div className='col-span-4'>
                </div>
                <div className='col-span-12'>
                    <ManageWorkingHours />
                </div>
            </div>
        </div>
    );
};

export default ManageAvailabilityPage;