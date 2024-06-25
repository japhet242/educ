"use client"
import { CoursForm } from "@/components/dashboard/cours/cours-form";
import { CiGrid31 } from "react-icons/ci";

export default function NewCours({ params }: { params: { id: string } }) {
    return (
        <div className=" mb-4">
            <div className=" md:container px-4">  
                    <CoursForm params={params}/>
            </div> 
        </div>
    )
}