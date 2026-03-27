"use client";

import "./globals.css"
import Header from "../components/Header"
import { AppProvider } from "../context/AppContext"
export const metadata = {
  title: 'musiq me',
  description: 'For those who think Music is life',
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {<Header />}
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
