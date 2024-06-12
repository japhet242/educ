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
import { SideBar } from "@/components/dashboard/sidebar";
import { SideBarMobile } from "@/components/dashboard/sidebaremobile";
import { Avatar } from "@/components/ui/avatar";
import { AvatarDemo } from "@/components/ui/avatardemo";
import { SearhForm } from "@/components/home/search";
import { DialogSearchButton } from "@/components/ui/dialogsearch";

const queryClient = new QueryClient()

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
}) 
export default function ProvidersDash({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const session = useSession()
const sessionData = session.data?.user
  return (
      <div>
       
     <div className=" md:flex">
        <div className=" w-full md:fixed">
          <SideBar/>
        </div>
        <div className=" w-full  ">
          <div className=" h-[64px] w-full md:fixed bg-white md:ml-[284px] md:w-[980px] shadow-md rounded-s-md flex items-center px-4 justify-between 2xl:w-[1090px]" >
            <div>
            <div className=" hidden md:block">
                <SearhForm/>
              </div>
            <div className="md:hidden">
               <SideBarMobile/> 
            </div>
            </div>
            <div className=" flex items-center space-x-4">
            <div className=" md:hidden">
                  <DialogSearchButton/>
                </div>
            <AvatarDemo avatar={sessionData?.image ?? ""}/>
            </div>

          </div>
          <div className={cn(
          "min-h-screen bg-background font-sans antialiased md:mt-[88px] md:ml-[300px] px-4 md:px-0",
          fontSans.variable
        )}>{children}</div>
     </div>
        </div>
      
        <Toaster />
      </div>
  );
}
