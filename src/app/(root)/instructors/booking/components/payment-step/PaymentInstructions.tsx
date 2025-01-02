import { FC } from 'react';

const PaymentInstructions: FC = () => {
    const bankDetails = {
        bankName: 'Commonwealth Bank',
        accountName: 'Lamp Driving School',
        bsb: '062-000',
        accountNumber: '12345678',
        reference: 'DL-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Payment Instructions</h2>
            <div className="space-y-4">
                <div className="bg-primary/5 border border-blue-200 rounded-md p-4">
                    <h3 className="font-medium text-primary mb-2">Bank Transfer Details</h3>
                    <div className="space-y-2 text-primary">
                        <p><span className="font-medium">Bank:</span> {bankDetails.bankName}</p>
                        <p><span className="font-medium">Account Name:</span> {bankDetails.accountName}</p>
                        <p><span className="font-medium">BSB:</span> {bankDetails.bsb}</p>
                        <p><span className="font-medium">Account Number:</span> {bankDetails.accountNumber}</p>
                        <p><span className="font-medium">Reference:</span> {bankDetails.reference}</p>
                    </div>
                </div>
                <div className="text-gray-600 text-sm">
                    <p>Please follow these steps:</p>
                    <ol className="list-decimal ml-4 space-y-1 mt-2">
                        <li>Transfer the exact amount using the bank details above</li>
                        <li>Use the provided reference number in your transfer</li>
                        <li>Take a screenshot or photo of your payment confirmation</li>
                        <li>Fill out the form below with your payment details</li>
                        <li>Upload your payment proof</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default PaymentInstructions;