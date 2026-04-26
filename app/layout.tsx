import "./globals.css"
import Header from "../components/Header"
import { AppProvider } from "../context/AppContext"
import { UserProvider } from "@/context/UserContext"
import { Suspense } from "react"
export const metadata = {
  title: {
    default: "musiq-me.com",
    template: "%s | musiq-me.com",
  },
  openGraph: {
    type: "website",
    siteName: "musiq-me.com",
    images: ["https://musiq-me.com/og-default.png"],
    description: "Learn aboutCarnatic and Hindustani ragas by exploring their use in India movies!!",
    url: "https://musiq-me.com/",
  },
  twitter: {
    card: "summary_large_image",
    site: "@musiq-me",
    images: ["https://musiq-me.com/og-default.png"],
  },
};

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <UserProvider>
          <AppProvider>
            {<Header />}
            <Suspense fallback={null}>
              <div className="section-mid" >
                {children}
              </div>
            </Suspense>
          </AppProvider>
        </UserProvider>
      </body>
    </html>
  )
}
