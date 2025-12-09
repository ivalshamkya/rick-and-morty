'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {/* First Page */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="h-12 w-12 border-3 border-black dark:border-white bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-black neo-shadow neo-hover"
      >
        <ChevronsLeft className="h-5 w-5" />
      </Button>

      {/* Previous Page */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-12 w-12 border-3 border-black dark:border-white bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-black neo-shadow neo-hover"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <span className="h-12 w-12 flex items-center justify-center font-black text-xl">
              ...
            </span>
          ) : (
            <Button
              variant={currentPage === page ? 'default' : 'outline'}
              onClick={() => onPageChange(page as number)}
              className={`h-12 w-12 border-3 border-black dark:border-white font-black neo-shadow ${
                currentPage === page
                  ? 'bg-[#00b5cc] hover:bg-[#009eb3] text-white'
                  : 'bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {page}
            </Button>
          )}
        </div>
      ))}

      {/* Next Page */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-12 w-12 border-3 border-black dark:border-white bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-black neo-shadow neo-hover"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Last Page */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="h-12 w-12 border-3 border-black dark:border-white bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-black neo-shadow neo-hover"
      >
        <ChevronsRight className="h-5 w-5" />
      </Button>

      {/* Page Info */}
      <div className="hidden sm:flex items-center gap-2 ml-4 px-4 py-2 border-3 border-black dark:border-white bg-[#84d65a] font-black text-sm">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}