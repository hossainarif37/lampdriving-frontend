import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Dispatch, FC, SetStateAction, useState } from 'react';

interface IDeleteLearner {
    id: string;
    setDropdownIsOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteLearner: FC<IDeleteLearner> = ({ id, setDropdownIsOpen }) => {
    const [open, isOpen] = useState<boolean>(false);

    const handleVerify = () => {
        // updateStatus({ id, status: reqStatus }).unwrap().then((res) => {
        //     toast({
        //         message: res.message,
        //     })
        //     isOpen(false);
        //     setDropdownIsOpen(false);
        // }).catch((err) => {
        //     toast({
        //         success: false,
        //         message: err.data.message || "Something went wrong",
        //     })
        // });
    }
    return (
        <Dialog open={open} onOpenChange={isOpen}>
            <DialogTrigger asChild>
                {
                    <Button variant={"ghost"} className='h-[36px] py-0 font-normal capitalize text-start justify-start px-2'>
                        Delete
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
                    Do you want to proceed with deleting this learner? Once deleted, their profile and data will no longer be accessible.
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
                            // disabled={isLoading}
                            onClick={handleVerify}
                            className={status === "cancel" ? "bg-red-500 hover:bg-red-600" : ""}
                        >
                            Delete
                        </Button>


                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default DeleteLearner;