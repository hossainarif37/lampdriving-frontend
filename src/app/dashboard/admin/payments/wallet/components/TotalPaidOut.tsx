import { toFixedNumber } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import React, { FC } from 'react';

const TotalPaidOut: FC<{ totalPaidOut: number }> = ({ totalPaidOut }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <ArrowUpRight className="text-blue-600" size={24} />
                </div>
                <span className="text-blue-600 flex items-center gap-1">
                    This Week <ArrowRight size={16} />
                </span>
            </div>
            <h3 className="text-2xl font-bold mt-4">${toFixedNumber(totalPaidOut)}</h3>
            <p className="text-gray-600">Total Paid to Instructors</p>
        </div>
    );
};

export default TotalPaidOut;