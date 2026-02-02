"use client";

import { ReactNode } from "react";

export interface Hit {
  id: string;
  title?: string;
  content?: string;
  url?: string;
  [key: string]: any;
}

export interface SearchBoxProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  children?: ReactNode;
}

export function useSearch(options?: {
  _searchKey?: string;
  queryBy?: string[];
  limit?: number;
  [key: string]: any;
}) {
  return {
    query: "",
    setQuery: () => {},
    result: { hits: [] as Hit[] },
    hits: [] as Hit[],
    isLoading: false,
    hasMore: false,
    loadMore: () => {},
  };
}

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
// Namespace for SearchBox components
SearchBox.Root = function SearchBoxRoot({
  children,
  search,
}: {
  children: ReactNode;
  search: any;
}) {
  return <div>{children}</div>;
};

SearchBox.Input = function SearchBoxInput({
  children,
  asChild,
  className,
  onFocus,
  ...props
}: {
  children?: ReactNode;
  asChild?: boolean;
  className?: string;
  onFocus?: (e: any) => void;
  [key: string]: any;
}) {
  if (asChild && children) {
    return children;
  }
  return <input className={className} onFocus={onFocus} {...props} />;
};

SearchBox.Empty = function SearchBoxEmpty({
  children,
  asChild,
}: {
  children?: ReactNode;
  asChild?: boolean;
}) {
  return asChild && children ? children : <div>{children}</div>;
};

SearchBox.Placeholder = function SearchBoxPlaceholder({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
};

SearchBox.HitList = function SearchBoxHitList({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
};

SearchBox.HitItem = function SearchBoxHitItem({
  children,
  asChild,
  href,
  hit,
}: {
  children?: ReactNode;
  asChild?: boolean;
  href?: string;
  hit?: any;
}) {
  return asChild && children ? children : <div>{children}</div>;
};

SearchBox.HitSnippet = function SearchBoxHitSnippet({
  fieldPath,
  components,
  fallbackFieldPaths,
}: {
  fieldPath?: string;
  components?: Record<string, any>;
  fallbackFieldPaths?: string[];
}) {
  return <span />;
};