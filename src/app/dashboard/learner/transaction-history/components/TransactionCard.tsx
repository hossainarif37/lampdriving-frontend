import React from 'react';
import { Calendar, CreditCard, DollarSign } from 'lucide-react';

interface TransactionCardProps {
    transactionId: string;
    amount: number;
    method: string;
    status: string;
    createdAt: string;
    type: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
    transactionId,
    amount,
    method,
    status,
    createdAt,
    type
}) => {
    const date = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Transaction ID</p>
                        <p className="font-medium">{transactionId.slice(0, 15)}...</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">${amount.toFixed(2)}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {status.toUpperCase()}
                    </span>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Payment Method: {method.toUpperCase()}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{date}</span>
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;