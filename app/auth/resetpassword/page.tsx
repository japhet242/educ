
import { ResetForm } from "@/components/auth/form-resetmail";
import { Social } from "@/components/auth/social";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function Login() {
    
    return (
        <div className=" bg-gradient-to-r from-indigo-500 min-h-[100vh] flex items-center justify-center">
            <div className=" max-w-[400px] min-h-[107px] bg-white p-[32px] rounded-xl shadow-md">
               
                <div className=" text-center mb-5">
                    <h1 className=" font-bold text-lg mb-2">Mot de passe oublier</h1>
            Content de te revoir! Veuillez mettre votre addresse Email pour continuer
                </div>
                 <Suspense>
                   <ResetForm/>
                 </Suspense>
            </div>
           
        </div>
    )
}