"use client"
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import "../globals.css";
const queryClient = new QueryClient()

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
}) 

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
      <SessionProvider>
      <div  className={cn(
          "min-h-screen bg-background font-sans antialiased ",
          fontSans.variable
        )}>{children}</div>
    </SessionProvider>
    </QueryClientProvider>
      </body>
      
      
    </html>
  );
}
