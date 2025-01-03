import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useUpdateBookingStatusMutation } from '@/redux/api/bookingApi/bookingApi';
import { Dispatch, FC, SetStateAction, useState } from 'react';

interface IUpdateBookingStatus {
    id: string;
    status: 'complete' | 'pending' | 'accept' | 'cancel';
    setDropdownIsOpen: Dispatch<SetStateAction<boolean>>
}

const UpdateBookingStatus: FC<IUpdateBookingStatus> = ({ id, status, setDropdownIsOpen }) => {
    const [open, isOpen] = useState<boolean>(false);
    const [updateStatus, { isLoading }] = useUpdateBookingStatusMutation();
    const reqStatus = status === "complete" ? "completed" : status === "accept" ? "accepted" : status === "pending" ? "pending" : "cancelled";
    const handleVerify = () => {
        updateStatus({ id, status: reqStatus }).unwrap().then((res) => {
            toast({
                message: res.message,
            })
            isOpen(false);
            setDropdownIsOpen(false);
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
                    <Button variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2'>
                        {
                            status === "complete" ?
                                "Completed"
                                :
                                status === "accept" ?
                                    "Accept"
                                    :
                                    "Reject"
                        }
                    </Button>
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
                        status === "complete" ?
                            "Do you want to proceed with completing this booking? Once completed, the booking will be completed."
                            :
                            status === "accept" ?
                                "Do you want to proceed with accepting this booking? Once accepted, the booking will be confirmed."
                                :
                                "Do you want to proceed with rejecting this? Once rejected, the status will be updated, and it will no longer be active."
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
                        <Button
                            disabled={isLoading}
                            onClick={handleVerify}
                            className={status === "cancel" ? "bg-red-500 hover:bg-red-600" : ""}
                        >
                            {
                                status === "complete" ?
                                    "Completed"
                                    :
                                    status === "accept" ?
                                        "Accept"
                                        :
                                        "Reject"
                            }
                        </Button>


                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default UpdateBookingStatus;