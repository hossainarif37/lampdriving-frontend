import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { X } from "lucide-react";
import { FC } from "react";

interface ConfirmationModalProps {
    onConfirm: () => void;
    isLoading: boolean;
    isOpen: boolean;
    setIsOpen: (boolean: boolean) => void;
}


const ConfirmationModal: FC<ConfirmationModalProps> = ({ onConfirm, isOpen, setIsOpen, isLoading }) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-primary">
                        Are you sure?
                    </DialogTitle>


                    <DialogDescription>
                        Do you want to delete this image? You can&apos;t undo this action after deleting it.
                    </DialogDescription>

                </DialogHeader>

                <DialogFooter>
                    <Button onClick={() => setIsOpen(false)} type="button" variant={"secondary"}>Cancel</Button>
                    <Button disabled={isLoading} loading={isLoading} onClick={onConfirm} type="button" variant={"red"}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmationModal;