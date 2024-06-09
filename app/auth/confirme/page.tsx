"use client"

import { confirmMail } from "@/actions/confirmmail-action";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { Suspense, useCallback, useEffect, useState } from "react"
import { useTransition } from 'react';

export default function Confirm() {
    return (
        <div>
            <Suspense>
                <ConfirmPage/>
            </Suspense>
        </div>
    )
    
}
function ConfirmPage() {
    const [isPending, startTransition] = useTransition();
    const [message , setMessage] = useState<undefined | string>("")
        const params = useSearchParams()
        const getToken = params.get("token")
         
    const mutate = useMutation({
        mutationFn:async ()=>{
        const data = await confirmMail({token:getToken?.toString()})
       setMessage(data?.message)
        }
    })
     const callback=  useCallback(()=>{
        startTransition(async () => {
            mutate.mutateAsync()
          });
        },[getToken])
        useEffect(()=>{
            callback()
        },[callback])
          
     return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center"
      >
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex flex-row justify-center items-center gap-2">
          {message !=="" && message!==undefined ? <div>Quelque chose s'est mal passé </div> : <div>succès</div>}
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400">
        {message !=="" && message!==undefined ? <div> {message}</div> : <div> Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter pour accéder à votre espace personnel en cliquant sur le lien de connexion ci-dessous. <Button variant="link" className=" text-blue-600"> <Link href="/auth/login">Se connecter</Link></Button></div>}
        </div>
      </div>
      <div></div>
    </div>
  )
}
