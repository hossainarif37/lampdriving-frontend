import { DollarSign } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const TotalWithdraw = ({ totalWithdraw }: { totalWithdraw: number }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="text-purple-600" size={24} />
                </div>
                <span className="text-purple-600 flex items-center gap-1">
                    Total <ArrowRight size={16} />
                </span>
            </div>
            <h3 className="text-2xl font-bold mt-4">${totalWithdraw.toLocaleString()}</h3>
            <p className="text-gray-600">Total Withdraw</p>
        </div>
    );
};

export default TotalWithdraw;