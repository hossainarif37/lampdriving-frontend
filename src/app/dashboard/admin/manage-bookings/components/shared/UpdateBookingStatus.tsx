import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useUpdateBookingStatusMutation } from '@/redux/api/bookingApi/bookingApi';
import { Dispatch, FC, SetStateAction, useState } from 'react';

interface IUpdateBookingStatus {
    id: string;
    status: 'complete' | 'refund' | 'ongoing';
    setDropdownIsOpen: Dispatch<SetStateAction<boolean>>
}


const UpdateBookingStatus: FC<IUpdateBookingStatus> = ({ id, status, setDropdownIsOpen }) => {
    const [open, isOpen] = useState<boolean>(false);
    const [updateStatus, { isLoading }] = useUpdateBookingStatusMutation();
    // const reqStatus = status === "complete" ? "completed" : status === "refund" ? "refunded" : status === "ongoing" ? "ongoing" : "upcoming";

    const handleVerify = () => {
        updateStatus({ id }).unwrap().then((res) => {
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
                                "Complete"
                                :
                                status === "refund" ?
                                    "Refund"
                                    :
                                    status === "ongoing" ?
                                        "Ongoing"
                                        :
                                        "Upcoming"
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
                            status === "refund" ?
                                "Do you want to proceed with refund this booking? Once refunded, the booking will be cancelled and the amount will be refunded."
                                :
                                status === "ongoing" ?
                                    "Do you want to proceed with ongoing this booking? Once ongoing, the booking will be started."
                                    :
                                    "Do you want to proceed with upcoming this booking? Once it is upcoming, the status will be updated"
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
                            className={status === "refund" ? "bg-red-500 hover:bg-red-600" : ""}
                        >
                            {
                                status === "complete" ?
                                    "Complete"
                                    :
                                    status === "refund" ?
                                        "Refund"
                                        :
                                        status === "ongoing" ?
                                            "Ongoing"
                                            :
                                            "Upcoming"
                            }
                        </Button>


                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default UpdateBookingStatus;