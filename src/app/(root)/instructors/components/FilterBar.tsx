"use client";
import useOutsideClick from "@/hooks/useOutsideClick";
import { SlidersHorizontal } from "lucide-react";
import { FC, useState } from "react";

const FilterBar: FC = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggleFilter = () => setIsFilterOpen((prev) => !prev);

    // Use the custom hook to detect clicks outside
    const filterRef = useOutsideClick(() => {
        if (isFilterOpen) setIsFilterOpen(false);
    }, isFilterOpen);

    return (
        <div className="relative">
            {/* Main Filter Bar */}
            <div
                ref={filterRef}
                onClick={toggleFilter}
                className="flex items-center gap-2 h-12 px-6 rounded-md gradient-color text-light cursor-pointer"
            >
                <SlidersHorizontal size={20} />
                <p className="hidden sm:block">Filter</p>
            </div>

            {/* Filter Dropdown */}
            {isFilterOpen && (
                <div
                    // ref={filterRef}
                    className="absolute top-14 md:-left-2 right-0 md:transform md:-translate-x-1/2 md:max-w-xs bg-white bg-gradient-to-b from-primary/5 to-indigo/0 shadow-lg border rounded-lg p-5 z-10 w-64 overflow-hidden"
                >
                    <h4 className="text-lg font-semibold mb-4 text-gradient">
                        Filter Options
                    </h4>

                    {/* Rating Filter */}
                    <div className="mb-4">
                        <label
                            htmlFor="rating"
                            className="block text-sm font-medium text-accent"
                        >
                            Minimum Rating
                        </label>
                        <select
                            id="rating"
                            className="mt-1 w-full rounded-md shadow-sm sm:text-sm p-1 focus:outline-none border"
                        >
                            <option value="">All Ratings</option>
                            <option value="4">4 & above</option>
                            <option value="3">3 & above</option>
                            <option value="2">2 & above</option>
                            <option value="1">1 & above</option>
                        </select>
                    </div>

                    {/* Price Filter */}
                    <div className="mb-4">
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-accent"
                        >
                            Price Range
                        </label>
                        <select
                            id="price"
                            className="mt-1 w-full rounded-md shadow-sm sm:text-sm p-1 border focus:outline-none"
                        >
                            <option value="">Select Range</option>
                            <option value="10-20">$10 - $20</option>
                            <option value="20-50">$20 - $50</option>
                            <option value="50-100">$50 - $100</option>
                        </select>
                    </div>

                    {/* Apply Button */}
                    <button
                        className="w-full py-2 text-white gradient-color rounded-md font-medium"
                        onClick={() => {
                            setIsFilterOpen(false);
                            // Add filter logic here
                        }}
                    >
                        Apply Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default FilterBar;
