"use client"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';
import { Button } from '@/components/ui/button';


interface IViewDetailsDialogProps {
    children: ReactNode;
    showAvailability: boolean;
    setShowAvailability: Dispatch<SetStateAction<boolean>>;
    title: string;
}


const ViewDetailsDialog: FC<IViewDetailsDialogProps> = ({ children, showAvailability, setShowAvailability, title }) => {
    return (
        <Dialog open={showAvailability} onOpenChange={setShowAvailability}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2 w-full'>View Details</Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl py-0 px-0 space-y-0 gap-0'>
                <DialogHeader>
                    <DialogTitle className='text-2xl font-semibold px-4 pt-3 pb-1 text-center'>
                        <span className='text-primary'>{title}</span>
                    </DialogTitle>
                </DialogHeader>
                {children}
                <DialogFooter className='pt-4 bg-gray-50'>
                    <div className="flex items-center justify-end gap-4 pb-4 px-4">
                        <DialogClose asChild>
                            <Button
                                variant={"outline"}
                                className=""
                            >
                                Close
                            </Button>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default ViewDetailsDialog;