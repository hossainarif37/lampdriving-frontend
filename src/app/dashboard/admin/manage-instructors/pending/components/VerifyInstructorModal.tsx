import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useUpdateInstructorStatusMutation } from '@/redux/api/instructorApi/instructorApi';
import { UserRoundCheck } from 'lucide-react';
import { FC, useState } from 'react';

interface IVerifyInstructorModal {
    id: string
}

const VerifyInstructorModal: FC<IVerifyInstructorModal> = ({ id }) => {
    const [open, isOpen] = useState<boolean>(false);
    const [updateStatus, { isLoading }] = useUpdateInstructorStatusMutation();

    const handleVerify = () => {
        updateStatus({ id, status: "verified" }).unwrap().then((res) => {
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
                <Button
                    className='bg-green-500 hover:bg-green-600'
                    title='Verify Instructor'
                    size={"icon"}>
                    <UserRoundCheck />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you absolutely sure?
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Do you want to proceed with verifying this instructor? Once verified, their profile will be visible to everyone.
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
                            className=""
                        >
                            Verify
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default VerifyInstructorModal;