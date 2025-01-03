import { FC } from 'react';
import FileUpload from '@/components/shared/FileUpload';
import { useBooking } from '@/providers/BookingProvider';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PaymentFrom: FC = () => {
    const { paymentInfo, setPaymentInfo, paymentImageFile, setPaymentImageFile } = useBooking();

    // remove image handler
    const removeProofImage = () => {
        setPaymentImageFile(null);
        setPaymentInfo((prev) => ({ ...prev, proofImage: '' }));
    };

    // set image url handler
    const handleSetImageUrl = (url: string) => {
        setPaymentInfo((prev) => ({ ...prev, proofImage: url }));
    }
    

    return (
        <form className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Payment Details</h2>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-1">
                            Transaction ID
                        </label>
                        <Input
                            type="text"
                            id="transactionId"
                            value={paymentInfo?.transactionId}
                            onChange={(e) => setPaymentInfo(prev => ({ ...prev, transactionId: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-1">
                            Method
                        </label>
                        <Select
                            defaultValue={paymentInfo?.method}
                            onValueChange={(value) => setPaymentInfo(prev => ({ ...prev, method: value }))}
                        >
                            <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary">
                                <SelectValue placeholder="Select Method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="payid">PayId</SelectItem>
                                <SelectItem value="paypal">Paypal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Proof
                    </label>
                    <FileUpload
                        setImageUrl={handleSetImageUrl}
                        imageUrl={paymentInfo.proofImage}
                        selectedFile={paymentImageFile}
                        setSelectedFile={setPaymentImageFile}
                        removeImage={removeProofImage}
                    />
                </div>

                {/* <Button className='w-full'>
                    Submit Payment Details
                </Button> */}
            </div>
        </form>
    );
};

export default PaymentFrom;