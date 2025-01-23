import { DollarSign } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';
import { toFixedNumber } from '@/lib/utils';

const TotalEarnings = ({ totalEarnings }: { totalEarnings: number }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
                <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="text-green-600" size={24} />
                </div>
                <span className="text-green-600 flex items-center gap-1">
                    0% <ArrowUpRight size={16} />
                </span>
            </div>
            <h3 className="text-2xl text-primary font-bold mt-4">${toFixedNumber(totalEarnings ?? 0)}</h3>
            <p className="text-gray-600">Total Earnings</p>
        </div>
    );
};

export default TotalEarnings;