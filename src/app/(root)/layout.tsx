import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/layouts/footer/Footer'));
import React, { ReactNode } from 'react';
import { FC } from 'react';
import Topbar from '@/components/layouts/header/topbar/Topbar';
import Navbar from '@/components/layouts/header/navbar/Navbar';
import ChatBot from '@/components/shared/chatbot/ChatBot';
import WarningBar from '@/components/shared/WarningBar';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className='flex flex-col min-h-screen overflow-hidden'>
            <WarningBar />
            <Topbar />
            <Navbar />
            <main className='flex-1'>
                {children}
            </main>
            <ChatBot />
            <Footer />
        </div>
    );
};

export default RootLayout;