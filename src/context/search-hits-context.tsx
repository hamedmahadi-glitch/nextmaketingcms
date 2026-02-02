"use client";
import * as React from "react";

import { type AvatarFragment } from "@/lib/basehub/fragments";

interface SearchHitsContextType {
  authorsAvatars: Record<string, AvatarFragment>;
}

const SearchHitsContext = React.createContext<SearchHitsContextType | undefined>(undefined);

export function SearchHitsProvider({
  authorsAvatars: authors,
  hits,
  children,
}: React.PropsWithChildren<Partial<SearchHitsContextType> & { hits?: any[] }>) {
  const derived = React.useMemo(() => {
    if (authors && Object.keys(authors).length > 0) return authors;

    const map: Record<string, AvatarFragment> = {};

    if (!hits || !Array.isArray(hits)) return map;

    for (const post of hits) {
      const authorsList = post.authors || post.authors_list || [];

      if (!Array.isArray(authorsList)) continue;

      for (const a of authorsList) {
        const id = (a && (a._id ?? a.id)) as string | undefined;

        if (!id) continue;

        // prefer existing, otherwise build a minimal avatar shape
        if (!map[id]) {
          map[id] = {
            url: a.image?.url || a.avatar?.url || undefined,
            alt: a.image?.alt || a.avatar?.alt || a._title || a.name || undefined,
            width: a.image?.width || a.avatar?.width || undefined,
            height: a.image?.height || a.avatar?.height || undefined,
          };
        }
      }
    }

    return map;
  }, [authors, hits]);

  return (
    <SearchHitsContext.Provider value={{ authorsAvatars: derived }}>
      {children}
    </SearchHitsContext.Provider>
  );
}

export function useSearchHits() {
  const context = React.useContext(SearchHitsContext);

  if (!context) {
    throw new Error("useSearchHits must be used within a SearchHitsProvider");
  }

  return context;
}
