"use client";

import React from 'react';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPreviousPage?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Pagination({
  currentPage,
  onPageChange,
  hasNextPage,
  hasPreviousPage = currentPage > 1,
  disabled = false,
  className = ""
}: PaginationProps) {
  const handlePreviousPage = () => {
    if (hasPreviousPage && !disabled) {
      onPageChange(Math.max(1, currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (hasNextPage && !disabled) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex justify-center mt-8 gap-2 ${className}`}>
      <button
        className={`px-4 py-2 rounded-md transition-all ease-linear ${
          hasPreviousPage && !disabled
            ? "cursor-pointer bg-[#60258A] hover:bg-[#ff5338] text-white"
            : "cursor-not-allowed bg-gray-600 text-gray-400"
        }`}
        onClick={handlePreviousPage}
        disabled={!hasPreviousPage || disabled}
      >
        Назад
      </button>
      
      <span className="mx-4 px-4 py-2 bg-[#08040d] rounded-md text-white">
        Страница {currentPage}
      </span>
      
      <button
        className={`px-4 py-2 rounded-md transition-all ease-linear ${
          hasNextPage && !disabled
            ? "cursor-pointer bg-[#60258A] hover:bg-[#ff5338] text-white"
            : "cursor-not-allowed bg-gray-600 text-gray-400"
        }`}
        onClick={handleNextPage}
        disabled={!hasNextPage || disabled}
      >
        Вперед
      </button>
    </div>
  );
}