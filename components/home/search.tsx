"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { searchSchema } from "@/zodschema/zod"
import { useState, useTransition } from 'react';
import { useMutation } from "@tanstack/react-query"
import { loginAction } from "@/actions/login-action"
import { toast } from "../ui/use-toast"
import { useSearchParams } from "next/navigation"
import { resetAction } from "@/actions/passwordreset-action"


export function SearhForm() {
  const [isPending, startTransition] = useTransition();
  const [succes,setSucces] = useState<string|undefined>("")
  const [error,setError] = useState<string|undefined>("")
  const params = useSearchParams()
  const geterror= params.get("error")
  // 1. Define your form.
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      name: "",
    },
  })
 
   //message toast pour l'erreur
   if (error !== "" && error !==undefined  ) {
    toast({
   variant:"destructive",
   title: "Erreur",
   description: error,
 })
 }
 //message toast pour le succes
 if (succes !== "" && succes !==undefined  ) {
  toast({
 variant:"succes",
 title: "Succes",
 description: succes,
})
}
 //message toast pour signialer qu'un compte existe deja
 if (geterror==="OAuthAccountNotLinked" ) {
  toast({
 variant:"destructive",
 title: "Erreur",
 description: "un compte existe deja avec cet addresse email essai avec un autre fournisseur",
})
}
const mutation = useMutation({
    mutationFn:async (values: z.infer<typeof searchSchema>) =>{
        // const data = await resetAction(values)
        // setSucces(data?.success)
        // setError(data?.error)
       
    }
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof searchSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition( async () => {
      await mutation.mutateAsync(values)
    });
   
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem >
                <div className=" flex items-center border-black">
                    <FormControl >
                <Input placeholder="shadcn" {...field} type="search" style={{marginTop:"0"}}/>
              </FormControl>
              <Button type="submit" className=" text-white mt-0" variant={"custum"} size={"sm"} style={{marginTop:0}}>rechercher</Button>
                </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
      </form>
    </Form>
  )
}
