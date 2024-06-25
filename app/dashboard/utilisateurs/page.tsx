"use client"
import { useEffect, useState } from "react";
import { getCoursById, getUsers } from "@/actions/cours-action";
import { CiGrid31 } from "react-icons/ci";
import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CiGrid41 } from "react-icons/ci";
import { IoGrid } from "react-icons/io5";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaPencil } from "react-icons/fa6";
import { AvatarDemo } from "@/components/ui/avatardemo";

type chapter ={ id: string; name: string | null; email: string | null; emailVerified: Date | null; image: string | null; password: string | null; createdAt: Date; lastLogin: Date | null; profilePicture: string | null; }[] | undefined

export default function Users() {

const [data ,setData] = useState<chapter>([])
    useEffect(()=>{
       async function get(){
           const users = await getUsers()
           setData(users)
       }
       get() 
    },[])


    return(
        <div className=" mt-4">
             <div className=" flex items-center space-x-4 text-xl font-bold mb-4 ">
                        <div className=" bg-blue-300 rounded-2xl p-2">
                           <CiGrid31 size={24}/>  
                        </div>
                    <span>
                    Les utilisateurs du site
                    </span>
                      
             </div>
        {/* // a bien faire la partie du chapitre  */}
            
            <ScrollArea className="h-[80vh] min-w-[300px] rounded-md border mt-2 ">
        <div className="p-4">
        {data && data.map((tag) => (
          <div key={tag.id} className="text-lg rounded-lg bg-blue-400 mt-2 h-12 px-2 flex items-center justify-between text-white">
            <div className="p-2 rounded-lg opacity-[0.3]">
            {/* <CiGrid41 /> */}
            <IoGrid />
            </div>
            <div>
              {tag.email}
            </div>
            <div className="flex space-x-2 text-white">
                <div>
                    {tag.createdAt.toLocaleDateString()}
                </div>
                <AvatarDemo avatar={tag.image?.toString()}/>
            </div>
          </div>
        ))}
      </div>
         </ScrollArea>
     </div>
      
    )
}