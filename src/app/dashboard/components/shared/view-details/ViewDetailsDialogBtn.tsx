"use client"
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { FC, ReactNode, useState } from 'react';

const ViewDetailsDialog = dynamic(
    () => import('./ViewDetailsDialog'),
    {
        loading: () => (
            <Button variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2 w-full'>View Details</Button>
        ),
        ssr: false
    }
);

interface IViewDetailsDialogBtnProps {
    children: ReactNode;
    title: string;
}


const ViewDetailsDialogBtn: FC<IViewDetailsDialogBtnProps> = ({ children, title }) => {
    const [showAvailability, setShowAvailability] = useState(false);

    return (
        <div className="text-center flex items-center justify-center w-full">
            {showAvailability ? (
                <ViewDetailsDialog
                    title={title}
                    showAvailability={showAvailability}
                    setShowAvailability={setShowAvailability}
                >
                    {children}
                </ViewDetailsDialog>
            ) : (
                <Button
                    onClick={() => setShowAvailability(true)}
                    variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2 w-full'>View Details</Button>
            )}
        </div>
    );
};

export default ViewDetailsDialogBtn;