import { LoginForm } from "@/components/auth/form-login";
import { RegisterForm } from "@/components/auth/form-register";
import { Social } from "@/components/auth/social";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Register() {
    
    return (
        <div className=" bg-gradient-to-r from-indigo-500 min-h-[100vh] flex items-center justify-center">
            <div className=" max-w-[400px] min-h-[547px] bg-white p-[32px] rounded-xl shadow-md">
               
                <div className=" text-center mb-5">
                    <h1 className=" font-bold text-lg mb-2">Créez votre compte</h1>
                    Bienvenue! Veuillez remplir les détails pour commencer
                </div>
                 <Social/>
                 <div className="flex justify-around relative items-center">
                    <span className=" bg-slate-300 h-[0.5px] w-full"></span>
                    <span className=" px-2">ou</span>
                    <span className=" bg-slate-300 h-[0.5px] w-full"></span>
                 </div>
            <RegisterForm/>
                    <div className=" text-sm text-center mt-4">
                        <span>Avoir un compte?</span>
                        <Button variant="link" className=" text-blue-400"><Link href="/auth/login" >Connectez-vous</Link></Button> 
                    </div>
            </div>
           
        </div>
    )
}