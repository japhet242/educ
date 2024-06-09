
import { ResetForm } from "@/components/auth/form-resetmail";
import { NewpasswordForm } from "@/components/auth/newpassword-form";
import { Social } from "@/components/auth/social";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function Login() {
    
    return (
        <div className=" bg-gradient-to-r from-indigo-500 min-h-[100vh] flex items-center justify-center">
            <div className=" max-w-[400px] min-h-[107px] bg-white p-[32px] rounded-xl shadow-md">
               
                <div className=" text-center mb-5">
                    <h1 className=" font-bold text-lg mb-2">Nouveau mot de passe</h1>
            Content de te revoir! Veuillez saisir votre nouveau mot de passe
                </div>
                 <Suspense>
                   <NewpasswordForm/>
                 </Suspense>
            
                    <div className=" text-sm text-center mt-4">
                        <span>Ce bon ?</span>
                        <Button variant="link" className=" text-blue-400"><Link href="/auth/login" >Revenir a page de connection</Link></Button> 
                    </div>
            </div>
           
        </div>
    )
}