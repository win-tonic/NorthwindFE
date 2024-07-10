"use client";

import { ReactNode } from "react";
import "./../styles/index.css";
import Navigation from "./_components/Navigation";

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <html lang='en'>
            <head>
                <title>Nowrthwind</title>
            </head>
            <body>
                <Navigation />
                <main>{children}</main>
            </body>
        </html>
    );
}
