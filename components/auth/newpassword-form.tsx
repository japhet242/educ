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
import { newpassworSchema } from "@/zodschema/zod"
import { useState, useTransition } from 'react';
import { useMutation } from "@tanstack/react-query"
import { loginAction } from "@/actions/login-action"
import { toast } from "../ui/use-toast"
import { useSearchParams } from "next/navigation"
import { resetAction } from "@/actions/passwordreset-action"
import { confirmReset } from "@/actions/password-logicreset-action"


export function NewpasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [succes,setSucces] = useState<string|undefined>("")
  const [error,setError] = useState<string|undefined>("")
  const params = useSearchParams()
  const getToken= params.get("token")
  // 1. Define your form.
  const form = useForm<z.infer<typeof newpassworSchema>>({
    resolver: zodResolver(newpassworSchema),
    defaultValues: {
      password: "",
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

const mutation = useMutation({
    mutationFn:async (values: z.infer<typeof newpassworSchema>) =>{
        const data = await confirmReset({token:getToken?.toString(),password:values})
        setSucces(data?.success)
        setError(data?.error)
       
    }
  })
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof newpassworSchema>) {
    startTransition( async () => {
      await mutation.mutateAsync(values)
    });
   
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className=" w-full text-white" variant={"custum"}>Continuer</Button>
      </form>
    </Form>
  )
}
