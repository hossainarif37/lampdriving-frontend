import { FC } from "react";

interface BookingFiltersProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

const BookingFilters: FC<BookingFiltersProps> = ({ activeFilter, onFilterChange }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm w-full">

            <div className="flex gap-3 p-5">
                <button
                    onClick={() => onFilterChange('running')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
            ${activeFilter === 'running'
                            ? 'gradient-color text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    Running
                </button>
                <button
                    onClick={() => onFilterChange('past')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
            ${activeFilter === 'past'
                            ? 'gradient-color text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    Past
                </button>
            </div>
        </div>
    );
};

export default BookingFilters;
