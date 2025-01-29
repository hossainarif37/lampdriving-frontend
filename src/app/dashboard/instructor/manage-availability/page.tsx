import { FC } from 'react';
import ManageAvailability from './components/ManageAvailability';
import ManageWorkingHours from './components/ManageWorkingHours';

const ManageAvailabilityPage: FC = () => {
    return (
        <div className='dashboard-wrapper'>
            <div className='dashboard-heading'>
                <h2 className='font-semibold text-2xl'>Manage Availability</h2>
            </div>
            <div className='grid md:grid-cols-12 gap-6 p-3 lg:p-6'>
                <div className='md:col-span-12 lg:col-span-8'>
                    <ManageAvailability />
                </div>
                <div className='md:col-span-12 lg:col-span-4'>
                </div>
                <div className='md:col-span-12 lg:col-span-12'>
                    <ManageWorkingHours />
                </div>
            </div>
        </div>
    );
};

export default ManageAvailabilityPage;