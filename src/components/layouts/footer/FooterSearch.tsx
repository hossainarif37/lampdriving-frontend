"use client"
import { FC, useState } from 'react';

const FooterSearchBoxDesign: FC = () => {
    const [selectedOption, setSelectedOption] = useState<'Auto' | 'Manual'>('Auto');

    return (
        <div>
            <div className="lg:max-w-5xl md:max-w-3xl h-48  md:h-40 flex flex-col md:flex-row items-center justify-center md:gap-4 gap-6 bg-[#212139] w-full md:rounded-md rounded-lg absolute -top-20 left-1/2 right-1/2 -translate-x-1/2 md:px-20 px-6">
                {/* Toggle Buttons */}
                <div className="md:w-1/4 w-full font-semibold text-light text-center flex gap-1 border p-1 rounded-md bg-light">
                    <button
                        onClick={() => setSelectedOption('Auto')}
                        className={`flex-1 px-0 py-2 rounded-md ${selectedOption === 'Auto' ? 'gradient-color text-light' : 'bg-light text-secondary'
                            }`}
                    >
                        Auto
                    </button>
                    <button
                        onClick={() => setSelectedOption('Manual')}
                        className={`flex-1 py-2 rounded-md ${selectedOption === 'Manual' ? 'gradient-color text-light' : 'bg-gray-200 text-black'
                            }`}
                    >
                        Manual
                    </button>
                </div>

                {/* Search Box */}
                <div className="flex gap-2 items-center rounded-md md:w-1/2 w-full">
                    <input
                        className="flex-1 px-4 py-3 rounded-md text-secondary duration-300 focus:outline-none placeholder:text-gray-600"
                        type="text"
                        placeholder="Enter your suburb"
                    />
                    <button className="px-6 py-3 gradient-color text-light font-semibold rounded-md">
                        SEARCH
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FooterSearchBoxDesign;

