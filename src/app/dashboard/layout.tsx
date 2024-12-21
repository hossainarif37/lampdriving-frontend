import React, { ReactNode } from 'react';
import { FC } from 'react';

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div>
            Dashboard
            {children}
        </div>
    );
};

export default DashboardLayout;