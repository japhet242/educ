"use client"
import z from"zod"
import { loginSchema } from "@/zodschema/zod"

export  async function loginAction(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }