import React, { ReactNode } from 'react';
import { FC } from 'react';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default RootLayout;