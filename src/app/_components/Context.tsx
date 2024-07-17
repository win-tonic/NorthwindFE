"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type QueryContextType = {
   queries: { query: string; resultCount: number }[];
   addQuery: (query: string, resultCount: number) => void;
};

const QueryContext = createContext<QueryContextType>({
   queries: [],
   addQuery: () => {},
});

export function useQueryContext() {
   const context = useContext(QueryContext);
   return context;
}

export function QueryProvider({ children }: { children: ReactNode }) {
   

   return (
         {children}
      
   );
}
