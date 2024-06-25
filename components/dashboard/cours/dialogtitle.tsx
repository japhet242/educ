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
import { CourSchema } from "@/zodschema/zod"
import { useState, useTransition } from 'react';
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { titleCreat } from "@/actions/cours-action"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

export function TitleDialog() {
    const [isPending, startTransition] = useTransition()
    const session = useSession()

    const form = useForm<z.infer<typeof CourSchema>>({
        resolver: zodResolver(CourSchema),
        defaultValues: {
          title: "",
        },
      })

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof CourSchema>) => {

          if (!session.data?.user.id) {
            console.error("User ID is not available in session data");
            return;
        }
            const data = await titleCreat({ values, instructorId: session.data?.user.id })
            console.log("mdj", session.data.user.id)
            if (data?.id) {
                redirect(`/dashboard/new-cours/${data.id}`)
            } else {
                // Handle error case, e.g., show a notification to the user
                console.error(data?.error)
            }
        }
    })

    const onSubmit = (values: z.infer<typeof CourSchema>) => {
        startTransition(async () => {
          await mutation.mutateAsync(values)
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="space-x-2 bg-[#4f46e5] text-white">
                    <IoAddCircleOutline size={24} />
                    <div>Ajouter un cours</div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Le titre de votre cours</DialogTitle>
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
