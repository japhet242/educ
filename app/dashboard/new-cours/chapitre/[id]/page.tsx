"use client"
import { getChapitreById } from "@/actions/cours-action";
import { ChapitreForm } from "@/components/dashboard/cours/chapitre-form";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";



export default function Chapter({ params }: { params: { id: string } }) {
        const [coursId, setCoursId]= useState<undefined|string>("")
    useEffect(()=>{
        async function get(){
             const data = await getChapitreById(params.id)
            setCoursId(data?.courseId)
        }
        get()
           
    },[params.id])
    return (
        <div className=" mb-4">
            <Button variant="link">
                <Link href={`/dashboard/new-cours/${coursId}`} className=" flex space-x-2 font-semibold">
               <GoArrowLeft />
                    <span>
                        retour au cours
                    </span>
                </Link>
          
            </Button>
            <div className=" md:container px-4">
                <ChapitreForm params={params}/>               
            </div> 
        </div>
    )
}