import { FcReadingEbook } from "react-icons/fc";
import {Navigation } from "./nav";

export function  SideBar() {
    return(
        <div className=" hidden md:min-h-[100vh] w-[270px] border-2 md:block rounded-2xl bg-[#4f46e5] text-white p-[16px]">
            <div className=" h-[64px] fixed w-[236px] flex justify-center ">
            <FcReadingEbook size={60}/> 
            </div>
           <Navigation/>
        </div>
    )
}