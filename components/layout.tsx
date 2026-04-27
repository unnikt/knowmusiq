import type { Metadata } from "next";

import "./globals.css";
import Header from "./Header";


export const metadata: Metadata = {
  title: "knowmusiq",
  description: "Search and learn about carnatic ragas",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark-theme">
      <body>
        <div className="dots" />
        <Header />
        {children}
        <div className="bottom-gradient" />
      </body>
    </html>
  );
}
