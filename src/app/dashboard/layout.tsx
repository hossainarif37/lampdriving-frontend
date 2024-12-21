import Sidebar from '@/components/layouts/sidebar/Sidebar';
import { ReactNode } from 'react';
import { FC } from 'react';

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className='flex flex-col lg:flex-row'>
            <div className='lg:min-h-screen lg:w-80 relative'>
                <Sidebar />
            </div>
            <div className='flex-1 min-h-screen border pt-[70px] pb-3 lg:py-3 pl-6 px-3'>
                {children}
                <div className="min-h-screen"></div>
                <div className="min-h-screen"></div>
                <div className="min-h-screen"></div>
            </div>
        </div>
    );
};

export default DashboardLayout;