import { FC } from 'react';
import React from 'react';
import { ListFilter } from 'lucide-react';

interface BookingFiltersProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

const BookingFilters: FC<BookingFiltersProps> = ({ activeFilter, onFilterChange }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
                <ListFilter size={20} className="text-blue-600" />
                <h3 className="font-semibold text-gray-800">Booking Filters</h3>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={() => onFilterChange('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
            ${activeFilter === 'all'
                            ? 'gradient-color text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    All Bookings
                </button>
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