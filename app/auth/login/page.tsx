import { LoginForm } from "@/components/auth/form-login";
import { Social } from "@/components/auth/social";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function Login() {
    
    return (
        <div className=" bg-gradient-to-r from-indigo-500 min-h-[100vh] flex items-center justify-center">
            <div className=" max-w-[400px] min-h-[547px] bg-white p-[32px] rounded-xl shadow-md">
               
                <div className=" text-center mb-5">
                    <h1 className=" font-bold text-lg mb-2">Connectez-vous</h1>
            Content de te revoir! Veuillez vous connecter pour continuer
                </div>
                 <Social/>
                 <div className="flex justify-around relative items-center">
                    <span className=" bg-slate-300 h-[0.5px] w-full"></span>
                    <span className=" px-2">ou</span>
                    <span className=" bg-slate-300 h-[0.5px] w-full"></span>
                 </div>
                 <Suspense>
                   <LoginForm/> 
                 </Suspense>
            
                    <div className=" text-sm text-center mt-4">
                        <span>Vous n'avez pas de compte ?</span>
                        <Button variant="link" className=" text-blue-400"><Link href="/auth/register" >S'inscrire</Link></Button> 
                    </div>
            </div>
           
        </div>
    )
}