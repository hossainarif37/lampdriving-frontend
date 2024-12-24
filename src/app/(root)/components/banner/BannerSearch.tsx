"use client";
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

const BannerSearch: FC = () => {
    const [carType, setCarType] = useState<'auto' | 'manual'>('auto');
    const [searchKey, setSearchKey] = useState<string>('');

    const router = useRouter();

    // search handler
    const handleSearch = () => {
        if (!searchKey) {
            return;
        }
        router.push(`/instructors?vehicle.type=${carType}&searchTerm=${searchKey}`)
    }

    return (
        <div className="bg-textCol lg:w-[500px] md:w-[400px] w-full rounded-lg lg:px-8 md:px-6 px-3 lg:py-14 md:py-10 py-7">
            {/* Container for all content */}
            <div className="space-y-6">

                {/* Heading */}
                <h2 className="text-3xl font-bold text-secondary text-center bg-gradient-to-r from-primary to-indigo bg-clip-text text-transparent">
                    Find a driving instructor
                </h2>

                {/* Toggle buttons for Auto/Manual */}
                <div className="w-full font-semibold text-textCol text-center border flex gap-3 p-3 rounded-md">
                    <button
                        onClick={() => setCarType('auto')}
                        className={`w-1/2 flex justify-center items-center px-0 py-3 rounded-md ${carType === 'auto'
                            ? 'gradient-color text-textCol'
                            : 'bg-gray-200 text-secondary'}`}
                    >
                        {carType == "auto" && <span><Check className='w-5' /></span>}
                        <span>Auto</span>
                    </button>
                    <button
                        onClick={() => setCarType('manual')}
                        className={`w-1/2 flex justify-center items-center py-2 rounded-md ${carType === 'manual'
                            ? 'gradient-color text-textCol'
                            : 'bg-gray-200 text-secondary'}`}
                    >
                        {carType == "manual" && <span><Check className='w-5' /></span>}
                        <span>Manual</span>
                    </button>
                </div>

                {/* Search input field */}
                <div className="flex gap-2 items-center rounded-md w-full border">
                    <input
                        onChange={(e) => setSearchKey(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-md text-secondary focus:outline-none placeholder:text-accent"
                        type="text"
                        placeholder="Enter your suburb"
                    />
                </div>

                <div>
                    {/* Search button */}
                    <button onClick={handleSearch} className="w-full py-3 gradient-color text-light font-semibold rounded-md">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BannerSearch;
