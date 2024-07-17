"use client";

import { ReactNode } from "react";
import "./../styles/index.css";
import Navigation from "./_components/Navigation";
import { QueryProvider } from "./_components/Context";

type Props = {
   children: ReactNode;
};

export default function Layout({ children }: Props) {
   const [queries, setQueries] = useState<
      { query: string; resultCount: number }[]
   >([]);

   function addQuery(query: string, resultCount: number) {
      setQueries((prevQueries) => [...prevQueries, { query, resultCount }]);
   }

   return (
      <html lang="en">
         <head>
            <title>Northwind</title>
         </head>
         <body>
            <QueryContext.Provider value={{ queries, addQuery }}>
               <Navigation />
               <main>{children}</main>
            </QueryContext.Provider>
         </body>
      </html>
   );
}
