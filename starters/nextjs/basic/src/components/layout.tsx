import type { Metadata } from "next";
import { Head } from "next/document";

import "./globals.css";
import { Header } from "./Header.jsx";

export const metadata: Metadata = {
  title: "knowmusiq",
  description: "Search and learn about carnatic ragas",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark-theme">
      <Head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <div className="dots" />
        <Header />
        {children}
        <div className="bottom-gradient" />
      </body>
    </html>
  );
}
