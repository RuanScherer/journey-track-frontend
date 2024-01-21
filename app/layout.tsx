import { SessionProvider } from "@/contexts/Session";
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"]
})

export const metadata: Metadata = {
  title: 'Trackr',
  description: 'Track strategic data from your app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} w-screen min-h-screen h-screen bg-gray-50`}>
        <SessionProvider>
          {children}
        </SessionProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
