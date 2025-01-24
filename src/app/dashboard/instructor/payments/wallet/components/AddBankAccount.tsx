import { Button } from '@/components/ui/button';
import { DialogHeader, DialogFooter, DialogContent, Dialog, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useAddBankAccountMutation } from '@/redux/api/walletApi/walletApi';
import { FC, useState } from 'react';

interface IAddBankAccountProps {
    id: string;
    bankAccount: {
        payId: string;
    } | undefined;
}

const AddBankAccount: FC<IAddBankAccountProps> = ({ bankAccount, id }) => {
    const [payId, setPayId] = useState<string>("");
    const [payIdError, setPayIdError] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addBankAccount, { isLoading }] = useAddBankAccountMutation();



    const handleAddBankAccount = () => {
        if (payId.trim() === "") {
            return setPayIdError(true);
        } else {
            setPayIdError(false);
        }
        addBankAccount({ walletId: id, payId }).unwrap().then((res) => {
            setIsModalOpen(false);
            toast({
                message: res.message
            })
        }).catch((err) => {
            toast({
                success: false,
                message: err?.data?.message || "Something went wrong"
            })
        });
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button className='bg-primary capitalize'>
                    Add Bank Account
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Bank Account</DialogTitle>
                    <DialogDescription>
                        Please ensure that the PayID provided is correct as it will be used for processing future payments. Note that once added, <span className='font-semibold'>the PayID will not be editable</span>.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="transactionId">PayID</Label>
                        <Input
                            defaultValue={bankAccount?.payId || ""}
                            disabled={bankAccount?.payId ? true : false}
                            onChange={(e) => setPayId(e.target.value)}
                            id="payId"
                            placeholder="Enter PayID"
                            className="h-11 disabled:text-black disabled:opacity-100"
                        />
                        {
                            payIdError && (
                                <p className="text-red-500 text-sm">Please enter your PayID</p>
                            )
                        }
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button loading={isLoading} disabled={isLoading || bankAccount?.payId ? true : false} onClick={handleAddBankAccount}>
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddBankAccount;