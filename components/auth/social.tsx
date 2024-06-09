"use client"
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function Social (){

    const handleClick = (provider:"github"|"google")=>{
            signIn(provider,{
                callbackUrl:"/"
            })
    }
    return (
        <div className=" mb-4 space-x-2 flex ">
            <Button className=" w-full shadow-sm rounded-xl flex justify-center items-center space-x-3" variant="outline" onClick={()=>handleClick("github")}>
            <FaGithub /><span>Github</span>
            </Button>
            <Button className=" w-full shadow-sm rounded-xl flex justify-center items-center space-x-3" variant="outline" onClick={()=>handleClick("google")}>
            <FcGoogle /><span>Google</span>
            </Button>
        </div>
    )
}