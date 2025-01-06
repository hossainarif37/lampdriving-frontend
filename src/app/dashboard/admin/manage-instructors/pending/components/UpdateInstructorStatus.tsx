import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useUpdateInstructorStatusMutation } from '@/redux/api/instructorApi/instructorApi';
import { Dispatch, FC, SetStateAction, useState } from 'react';

interface IUpdateInstructorStatus {
    id: string;
    status: 'verify' | 'reject';
    setDropdownIsOpen: Dispatch<SetStateAction<boolean>>
}

const UpdateInstructorStatus: FC<IUpdateInstructorStatus> = ({ id, status }) => {
    const [open, isOpen] = useState<boolean>(false);
    const [updateStatus, { isLoading }] = useUpdateInstructorStatusMutation();

    const handleVerify = () => {
        updateStatus({ id, status: status === "verify" ? "verified" : "rejected" }).unwrap().then((res) => {
            toast({
                message: res.message,
            })
            isOpen(false);
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong",
            })
        });
    }
    return (
        <Dialog open={open} onOpenChange={isOpen}>
            <DialogTrigger asChild>
                {
                    status === "verify" ?
                        <Button variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2'>Verify</Button>
                        :
                        <Button variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2'>Reject</Button>
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you absolutely sure?
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {
                        status === "verify"
                            ?
                            "Do you want to proceed with verifying this instructor? Once verified, their profile will be visible to everyone."
                            :
                            "Do you want to proceed with rejecting this instructor? Once rejected, their profile will not be visible to everyone."
                    }
                </DialogDescription>
                <DialogFooter>
                    <div className="flex items-center justify-end gap-4">
                        <DialogClose asChild>
                            <Button
                                variant={"outline"}
                                className=""
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        {
                            status === "verify" ?
                                <Button
                                    disabled={isLoading}
                                    onClick={handleVerify}
                                    className='bg-green-500 hover:bg-green-600'
                                >
                                    Verify
                                </Button>
                                :
                                <Button
                                    disabled={isLoading}
                                    onClick={handleVerify}
                                    className='bg-red-500 hover:bg-red-600'
                                >
                                    Reject
                                </Button>
                        }

                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default UpdateInstructorStatus;