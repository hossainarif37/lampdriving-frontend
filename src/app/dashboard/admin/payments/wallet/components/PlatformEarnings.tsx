import { toFixedNumber } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Percent } from 'lucide-react';
import React, { FC } from 'react';

const PlatformEarnings: FC<{ platformEarnings: number }> = ({ platformEarnings }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <Percent className="text-purple-600" size={24} />
                </div>
                <span className="text-purple-600 flex items-center gap-1">
                    20% cut <ArrowRight size={16} />
                </span>
            </div>
            <h3 className="text-2xl font-bold mt-4">${toFixedNumber(platformEarnings)}</h3>
            <p className="text-gray-600">Platform Earnings</p>
        </div>
    );
};

export default PlatformEarnings;