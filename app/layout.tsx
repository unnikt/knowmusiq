import "./globals.css"
import Header from "../components/Header"
import { AppProvider } from "../context/AppContext"
import { UserProvider } from "@/context/UserContext"
import { Suspense } from "react"
export const metadata = {
  title: 'musiq me',
  description: 'For those who think Music is life',
}

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
