import { FC } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IInstructorPayout } from './InstructorPayoutsTable';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface IPayoutModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    selectedInstructor: IInstructorPayout | null;
    isCopied: boolean;
    copyPayId: (payId: string) => void;
    handleSubmitPayout: (instructorId: string) => void;
    transactionId: string;
    setTransactionId: (transactionId: string) => void;
    isPayoutLoading: boolean;
}

const PayoutModal: FC<IPayoutModalProps> = ({ isModalOpen, setIsModalOpen, selectedInstructor, isCopied, copyPayId, handleSubmitPayout, transactionId, setTransactionId, isPayoutLoading }) => {
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Process Payout</DialogTitle>
                    <DialogDescription>
                        Please send ${selectedInstructor?.amount} to the instructor&apos;s PayID account,
                        then enter the transaction ID below.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Instructor&apos;s PayID</Label>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 p-3 bg-light-green text-primary rounded-md text-sm font-mono">
                                {selectedInstructor?.payId}
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => copyPayId(selectedInstructor?.payId || '')}
                                className="h-10 w-10"
                            >
                                {
                                    isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />
                                }
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="transactionId">PayID Transaction ID</Label>
                        <Input
                            id="transactionId"
                            placeholder="Enter transaction ID after sending payment"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            className="h-11"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleSubmitPayout(selectedInstructor?._id || '')} disabled={!transactionId.trim() || isPayoutLoading}>
                        Confirm Payout
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PayoutModal;