import { FcReadingEbook } from "react-icons/fc";
import { Navigation } from "./nav";

export function SideBar() {
    return (
        <div className="hidden md:block md:min-h-[100vh] border-2 rounded-2xl bg-[#4f46e5] text-white p-[16px] md:fixed md:w-[270px]">
            <div className="h-[64px] fixed w-[236px] flex justify-center bg-[#4f46e5] z-50">
                <FcReadingEbook size={60} />
            </div>
            <div className="mt-[80px] md:mt-0 relative overflow-auto h-[calc(100vh-80px)] overscroll-auto focus:overscroll-contain ">
                <Navigation />
            </div>
        </div>
    );
}
