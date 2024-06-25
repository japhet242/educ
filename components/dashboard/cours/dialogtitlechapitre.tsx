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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoAddCircleOutline } from "react-icons/io5";
import Link from "next/link"
import { titleChapitreSchema } from "@/zodschema/zod"
import { useState, useTransition } from 'react';
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { titleChapitreCreat, titleCreat } from "@/actions/cours-action"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

export function TitleDialogChapitre({id}:{id:string}) {
    const [isPending, startTransition] = useTransition()
    const session = useSession()

    const form = useForm<z.infer<typeof titleChapitreSchema>>({
        resolver: zodResolver(titleChapitreSchema),
        defaultValues: {
          title: "",
        },
      })

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof titleChapitreSchema>) => {
            const data = await titleChapitreCreat({ title:values, id})
            if (data?.id) {
                redirect(`/dashboard/new-cours/chapitre/${data.id}`)
            } else {
                // Handle error case, e.g., show a notification to the user
                console.error(data?.error)
            }
        }
    })

    const onSubmit = (values: z.infer<typeof titleChapitreSchema>) => {
        startTransition(async () => {
          await mutation.mutateAsync(values)
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="space-x-2 bg-[#4f46e5] text-white">
                    <IoAddCircleOutline size={24} />
                    <div>Ajouter un chapitre</div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Le titre du chapitre</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} className="bg-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit" className="text-white" variant={"custum"}>enregisté</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
