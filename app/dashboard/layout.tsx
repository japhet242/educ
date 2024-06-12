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
import { SessionProvider, useSession } from "next-auth/react"
import "../globals.css";
import ProvidersDash from "./providers";

const queryClient = new QueryClient()

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
}) 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ProvidersDash children={children}/>
        <Toaster />
    </SessionProvider>
    </QueryClientProvider>
      </body>
      
      
    </html>
  );
}
