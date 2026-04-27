import type { Metadata } from "next";

import "./globals.css";
import Header from "./Header";


export const metadata = {
  title: {
    default: "musiq-me.com",
    template: "%s | musiq-me.com",
  },
  description: "Learn about Carnatic and Hindustani ragas by exploring their use in movie songs!!",
  openGraph: {
    type: "website",
    siteName: "musiq-me.com",
    url: "https://musiq-me.com/",
    description: "Learn about Carnatic and Hindustani ragas by exploring their use in movie songs!!",
    images: [
      {
        url: "https://musiq-me.com/og-default.png",
        width: 1200,
        height: 630,
        alt: "musiq-me.com OG image",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@musiq-me",
    images: ["https://musiq-me.com/og-default.png"],
  },
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
