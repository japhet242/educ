import { useEffect, useState } from "react";
import { TitleDialogChapitre } from "./dialogtitlechapitre";
import { getCoursById } from "@/actions/cours-action";
import { CiGrid31 } from "react-icons/ci";
import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CiGrid41 } from "react-icons/ci";
import { IoGrid } from "react-icons/io5";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaPencil } from "react-icons/fa6";

type chapter = { id: string;
     title: string;
      content: string | null; 
      description: string | null; 
      video: string | null; 
      videoyoutube: string | null;
       isFree: boolean; 
       courseId: string; }[] | undefined

export function Chapitre({id}:{id:string}) {

const [data ,setData] = useState<chapter>([])
    useEffect(()=>{
        getCoursById(id).then(data=>{
           setData(data?.chapters)
        })
    },[id])


    return(
        <div className=" mt-4">
             <div className=" flex items-center space-x-4 text-xl font-bold mb-4 ">
                        <div className=" bg-blue-300 rounded-2xl p-2">
                           <CiGrid31 size={24}/>  
                        </div>
                    <span>
                    Chapitres
                    </span>
                      
             </div>
        <TitleDialogChapitre id={id}/> 
        {/* // a bien faire la partie du chapitre  */}
            
            <ScrollArea className=" h-96 min-w-[300px] rounded-md border mt-2 ">
        <div className="p-4">
        {data && data.map((tag) => (
          <div key={tag.id} className="text-lg rounded-lg bg-blue-400 mt-2 h-12 px-2 flex items-center justify-between text-white">
            <div className="p-2 rounded-lg opacity-[0.3]">
            {/* <CiGrid41 /> */}
            <IoGrid />
            </div>
            <div>
              {tag.title}
            </div>
            <div className="flex space-x-2 text-white  ">
                <div className="  text-sm h-5 flex items-center">
                    {tag.isFree ? <span className=" p-1 bg-green-400 rounded-lg">gratuit</span> : <span className="bg-orange-500 rounded-lg  p-1">payant</span>}
                </div>
                <Link href={`/dashboard/new-cours/chapitre/${tag.id}`}> 
                <Button variant="link" className=" text-white"><FaPencil /> <span>editer</span> </Button>
                </Link>
            </div>
          </div>
        ))}
      </div>
         </ScrollArea>
     </div>
      
    )
}