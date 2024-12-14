"use client"
import { FC, useState } from 'react';

const SearchBoxDesign: FC = () => {
    const [selectedOption, setSelectedOption] = useState('Auto');
    return (
        <div className='bg-textCol md:w-[500px] rounded-lg md:px-8 md:py-14'>
            <div className='space-y-8'>
                <div>
                    <h2 className='text-3xl font-bold text-secondary text-center'>Find a driving instructor</h2>
                </div>
                <div className=" w-full font-semibold text-textCol text-center border flex gap-3 p-2 rounded-md">
                    <button
                        onClick={() => setSelectedOption('Auto')}
                        className={`flex-1 px-0 py-2 rounded-md ${selectedOption === 'Auto' ? 'bg-primary text-textCol' : 'bg-gray-200 text-secondary'
                            }`}
                    >
                        Auto
                    </button>
                    <button
                        onClick={() => setSelectedOption('Manual')}
                        className={`flex-1 py-2 rounded-md ${selectedOption === 'Manual' ? 'bg-primary text-textCol' : 'bg-gray-200 text-secondary'
                            }`}
                    >
                        Manual
                    </button>
                </div>
                <div>
                    <div className="flex gap-2 items-center rounded-md w-full border">
                        <input
                            className="flex-1 px-4 py-3 rounded-md text-secondary duration-300 focus:outline-none outline-none placeholder:text-accent"
                            type="text"
                            placeholder="Enter your suburb"
                        />
                    </div>
                </div>
                <div>
                    <button className="w-full py-3 bg-primary text-secondary font-semibold rounded-md">
                        SEARCH
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBoxDesign;