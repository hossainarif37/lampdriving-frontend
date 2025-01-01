import DashboardNav from '@/components/layouts/dashboard-nav/DashboardNav';
import Sidebar from '@/components/layouts/sidebar/Sidebar';
import { ReactNode } from 'react';
import { FC } from 'react';

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className='flex flex-col lg:flex-row bg-gray-100 '>
            <div className='lg:min-h-screen lg:w-80 relative bg-white'>
                <Sidebar />
            </div>
            <div className='flex-1 min-h-screen'>
                <DashboardNav />
                <div className='pt-[80px] pb-3 lg:py-3 pl-6 px-3'>
                    {children}
                </div>
                {/* <div className="min-h-screen"></div> */}
                {/* <div className="min-h-screen"></div>
                <div className="min-h-screen"></div> */}
            </div>
        </div>
    );
};

export default DashboardLayout;