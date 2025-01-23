import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useUpdateAScheduleStatusMutation } from '@/redux/api/scheduleApi/scheduleApi';
import { Dispatch, FC, SetStateAction, useState } from 'react';

interface IUpdateScheduleStatus {
    id: string;
    status: 'ongoing' | 'complete';
    setDropdownIsOpen: Dispatch<SetStateAction<boolean>>
}

const UpdateScheduleStatus: FC<IUpdateScheduleStatus> = ({ id, status, setDropdownIsOpen }) => {
    const [open, isOpen] = useState<boolean>(false);
    const [UpdateScheduleStatus, { isLoading }] = useUpdateAScheduleStatusMutation();
    const reqStatus = status === "complete" ? "completed" : "ongoing";
    const handleVerify = () => {
        UpdateScheduleStatus({ id, status: reqStatus }).unwrap().then((res) => {
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
                                "Ongoing"
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
                            "Do you want to proceed with completing this schedule? Once completed, the schedule will be completed."
                            :
                            "Do you want to proceed with ongoing this schedule? Once you make this ongoing, the schedule will be started."
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
                        >
                            {
                                status === "complete" ?
                                    "Complete"
                                    :
                                    "Ongoing"
                            }
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default UpdateScheduleStatus;