"use client"
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { SessionProvider, useSession } from "next-auth/react";
import "../globals.css";
import { SideBar } from "@/components/dashboard/sidebar";
import { SideBarMobile } from "@/components/dashboard/sidebaremobile";
import { Avatar } from "@/components/ui/avatar";
import { AvatarDemo } from "@/components/ui/avatardemo";
import { SearhForm } from "@/components/home/search";
import { DialogSearchButton } from "@/components/ui/dialogsearch";
import { Toaster } from "@/components/ui/toaster";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function ProvidersDash({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();
  const sessionData = session.data?.user;

  return (
    <div>
      <div className="md:flex">
          <SideBar />
        <div className="w-full md:ml-[280px]">
          <div className="h-[64px] w-full fixed md:static bg-white shadow-md flex items-center justify-between px-4 md:px-0 z-50">
            <div className="flex items-center w-full justify-between md:container md:mx-auto lg:max-w-[980px] max-w-lg md:max-w-[630px] 2xl:w-[1090px]">
              <div className="hidden md:block">
                <SearhForm />
              </div>
              <div className="md:hidden">
                <SideBarMobile />
              </div>
              <div className="flex items-center space-x-4">
                <div className="md:hidden">
                  <DialogSearchButton />
                </div>
                <div className=" flex items-center space-x-2">
                  {sessionData?.email ? <div className=" hidden md:block">{sessionData?.email}</div> : ""}
                   <AvatarDemo avatar={sessionData?.image ?? ""} />
                </div>
              </div>
            </div>
          </div>
          <div className={cn(
            "min-h-screen bg-background font-sans antialiased pt-[74px] md:pt-6 md:mt-0 px-4 md:px-0",
            fontSans.variable
          )}>
            {children}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
