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
import { registerSchema } from "@/zodschema/zod"
import { useState, useTransition } from 'react';
import { useMutation } from "@tanstack/react-query"
import { loginAction } from "@/actions/login-action"
import { registerAction } from "@/actions/register-action"
import { toast } from "../ui/use-toast"
import { ToastAction } from "@/components/ui/toast"


export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [succes,setSucces] = useState<string|undefined>("")
  const [error,setError] = useState<string|undefined>("")
  console.log(error)
  // 1. Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name:"",
      email: "",
      password:""
    },
  })
  const mutation = useMutation({
    mutationFn:async (values: z.infer<typeof registerSchema>) =>{
        const data =await registerAction(values)
        setSucces(data?.success)
        setError(data?.error)
       
    }
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
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof registerSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition( async () => {
      await mutation.mutateAsync(values)
    });
   
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className=" w-full text-white" variant={"custum"}>S'inscrire</Button>
      </form>
    </Form>
  )
}
