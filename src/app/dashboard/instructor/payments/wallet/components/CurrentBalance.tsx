import { toFixedNumber } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Wallet } from 'lucide-react';
import React from 'react';

const CurrentBalance = ({ currentBalance }: { currentBalance: number }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Wallet className="text-blue-600" size={24} />
                </div>
                <span className="text-blue-600 flex items-center gap-1">
                    Available <ArrowRight size={16} />
                </span>
            </div>
            <h3 className="text-2xl text-primary font-bold mt-4">${toFixedNumber(currentBalance)}</h3>
            <p className="text-gray-600">Current Balance</p>
        </div>
    );
};

export default CurrentBalance;