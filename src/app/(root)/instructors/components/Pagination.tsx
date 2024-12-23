import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const isDisabled = (condition: boolean) => (condition ? 'disabled:opacity-50' : 'hover:bg-gray-100');

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg ${isDisabled(currentPage === 1)}`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === i + 1
              ? 'gradient-color text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          {i + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg ${isDisabled(currentPage === totalPages)}`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
