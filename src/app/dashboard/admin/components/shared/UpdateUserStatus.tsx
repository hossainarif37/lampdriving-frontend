import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useUpdateUserStatusMutation } from '@/redux/api/userApi/userApi';
import { Dispatch, FC, SetStateAction, useState } from 'react';

interface IUpdateUserStatus {
    id: string;
    setDropdownIsOpen: Dispatch<SetStateAction<boolean>>;
    role: 'instructor' | 'learner';
    status: 'active' | 'blocked';
}

const UpdateUserStatus: FC<IUpdateUserStatus> = ({ id, setDropdownIsOpen, role, status }) => {
    const [open, isOpen] = useState<boolean>(false);

    const [UpdateUserStatus, { isLoading }] = useUpdateUserStatusMutation();

    const handleUpdateStatus = () => {
        UpdateUserStatus({ id, status }).unwrap().then((res) => {
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
                <Button variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2'>
                    {status === "blocked" ? "Block" : "Unblock"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you absolutely sure?
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Do you want to proceed with {status === "blocked" ? "Block" : "Unblock"} this {role}? Once   {status === "blocked" ? "Block" : "Unblock"}, their profile and data will be{status === "blocked" ? " no longer" : ""} accessible.
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
                            onClick={handleUpdateStatus}
                            className={"bg-red-500 hover:bg-red-600"}
                        >
                            {status === "blocked" ? "Block" : "Unblock"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default UpdateUserStatus;