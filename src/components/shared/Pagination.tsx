"use client"
import { FC, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPageProps: number;
  totalPages: number;
}


const Pagination: FC<PaginationProps> = ({ currentPageProps, totalPages }) => {
  const [currentPage, setCurrentPage] = useState(currentPageProps || 1);

  const isDisabled = (condition: boolean) => (condition ? 'disabled:opacity-50' : 'hover:bg-gray-100');

  const urlSearchParams = useSearchParams();

  const { replace } = useRouter();

  // Function to handle page change
  const onPageChange = (page: number) => {
    const searchParams = new URLSearchParams(urlSearchParams);
    if (page >= 1 && page <= totalPages) {
      searchParams.set('page', page.toString());
      replace(`?${searchParams.toString()}`);
      setCurrentPage(page);
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-[4px] ${isDisabled(currentPage === 1)}`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 rounded-[4px] ${currentPage === i + 1
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
        className={`p-2 rounded-[4px] ${isDisabled(currentPage === totalPages)}`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;