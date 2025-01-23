import React from 'react';
import { Calculator, CreditCard, Receipt } from 'lucide-react';

interface TransactionSummaryProps {
    totalTransactions: number;
    totalAmount: number;
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({
    totalTransactions,
    totalAmount,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="bg-purple-100 rounded-full p-3">
                        <Receipt className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Total Transactions</p>
                        <p className="text-2xl font-semibold">{totalTransactions}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-3">
                        <Calculator className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Total Amount</p>
                        <p className="text-2xl font-semibold">${totalAmount.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-3">
                        <CreditCard className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Payment Method</p>
                        <p className="text-2xl font-semibold">Card</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionSummary;