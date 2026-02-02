"use client";
// Stub for basehub/react-search - Search functionality compatibility shim
import { ReactNode } from "react";

// Search result hit type
export interface Hit {
  id: string;
  title?: string;
  content?: string;
  url?: string;
  [key: string]: any;
}

// SearchBox component props
export interface SearchBoxProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  children?: ReactNode;
}

// useSearch hook stub
export function useSearch() {
  return {
    query: "",
    setQuery: () => {},
    hits: [] as Hit[],
    isLoading: false,
    hasMore: false,
    loadMore: () => {},
  };
}

// SearchBox component stub
export function SearchBox({
  className,
  placeholder = "Search...",
  onSearch,
}: SearchBoxProps) {
  return (
    <div className={className}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch?.(e.target.value)}
      />
    </div>
  );
}
