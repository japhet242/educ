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
import { categorySchema } from "@/zodschema/zod"
import { useState, useTransition } from 'react';
import { useMutation } from "@tanstack/react-query"
import { loginAction } from "@/actions/login-action"
import { useSearchParams } from "next/navigation"
import { resetAction } from "@/actions/passwordreset-action"
import { toast } from "@/components/ui/use-toast"
import { creatCategory, udapte } from "@/actions/cours-action"

export function CategoryForm ({id}:{id:string}) {
  const [isPending, startTransition] = useTransition();
  const [succes,setSucces] = useState<string|undefined>("")
  const [error,setError] = useState<string|undefined>("")
  const params = useSearchParams()
  const geterror= params.get("error")
  // 1. Define your form.
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category: "",
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
    mutationFn:async (values: z.infer<typeof categorySchema>) =>{
        const data = await creatCategory({values})
        setError(data?.error)
        setSucces(data?.success)
    }
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof categorySchema>) {
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categorie</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className=" w-full text-white" variant={"custum"}>ajouter</Button>
      </form>
    </Form>
  )
}
