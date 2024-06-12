import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FcReadingEbook } from "react-icons/fc";
import { Navigation } from "./nav";

export function SideBarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
      <button className="relative w-[30px] h-[24px] flex flex-col items-center justify-center space-y-2">
                <span className={`block h-[2px] w-full bg-black transition-transform duration-300}`}></span>
                <span className={`block h-[2px] w-full bg-black transition-opacity duration-300 `}></span>
                <span className={`block h-[2px] w-full bg-black transition-transform duration-300`}></span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className=" bg-[#4338ca] text-white absolute h-min-[100vh]">
        <SheetHeader>
        <div className=" h-[40px] flex justify-center">
            <FcReadingEbook size={60}/> 
            </div>
          <SheetTitle className="text-white">Tableau de Bord</SheetTitle>
         
        </SheetHeader>
        <div className="grid gap-4 py-2">
          <Navigation/>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
