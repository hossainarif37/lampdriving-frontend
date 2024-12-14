"use client";
import { FC, useState } from 'react';

const SearchBoxDesign: FC = () => {
    const [selectedOption, setSelectedOption] = useState('Auto'); // State for selected button

    return (
        <div className="bg-textCol lg:w-[500px] md:w-[400px] w-full rounded-lg lg:px-8 md:px-6 px-3 lg:py-14 md:py-12 py-8">
            {/* Container for all content */}
            <div className="space-y-8">

                {/* Heading */}
                <h2 className="text-3xl font-bold text-secondary text-center">
                    Find a driving instructor
                </h2>

                {/* Toggle buttons for Auto/Manual */}
                <div className="w-full font-semibold text-textCol text-center border flex gap-3 p-2 rounded-md">
                    <button
                        onClick={() => setSelectedOption('Auto')}
                        className={`flex-1 px-0 py-2 rounded-md ${selectedOption === 'Auto'
                            ? 'bg-primary text-textCol'
                            : 'bg-gray-200 text-secondary'}`}
                    >
                        Auto
                    </button>
                    <button
                        onClick={() => setSelectedOption('Manual')}
                        className={`flex-1 py-2 rounded-md ${selectedOption === 'Manual'
                            ? 'bg-primary text-textCol'
                            : 'bg-gray-200 text-secondary'}`}
                    >
                        Manual
                    </button>
                </div>

                {/* Search input field */}
                <div className="flex gap-2 items-center rounded-md w-full border">
                    <input
                        className="flex-1 px-4 py-3 rounded-md text-secondary focus:outline-none placeholder:text-accent"
                        type="text"
                        placeholder="Enter your suburb"
                    />
                </div>

                {/* Search button */}
                <button className="w-full py-3 bg-primary text-secondary font-semibold rounded-md">
                    SEARCH
                </button>
            </div>
        </div>
    );
};

export default SearchBoxDesign;
