import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "../globals.css";
import { cn } from "@/lib/utils"
import Providers from "./providers";
import { url } from "inspector";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: {
    template: 'Acme Dashboard',
    default: 'EDUC',
  },
  icons:"/favicon.ico"
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       <Providers children={children}/>
      </body>
    </html>
  );
}
