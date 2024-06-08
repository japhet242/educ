"use client"
import z from"zod"
import { registerSchema } from "@/zodschema/zod"

export  async function registerAction(values: z.infer<typeof registerSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }