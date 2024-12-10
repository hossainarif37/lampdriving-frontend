import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/layouts/footer/Footer'));
import Header from '@/components/layouts/header/Header';
import React, { ReactNode } from 'react';
import { FC } from 'react';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-1 flex flex-col items-center justify-center'>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;