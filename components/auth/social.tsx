import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function Social (){
    return (
        <div className=" mb-4 space-x-2 flex ">
            <Button className=" w-full shadow-sm rounded-xl flex justify-center items-center space-x-3" variant="outline">
            <FaGithub /><span>Github</span>
            </Button>
            <Button className=" w-full shadow-sm rounded-xl flex justify-center items-center space-x-3" variant="outline">
            <FcGoogle /><span>Google</span>
            </Button>
        </div>
    )
}