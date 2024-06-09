import GitHub from "next-auth/providers/github"
import Google from"next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import z from"zod"
import bcrypt from"bcryptjs"
import { loginSchema } from "./zodschema/zod"
import prisma from "./lib/db"


export default { providers: [GitHub,Google,Credentials({
    authorize: async (credentials) => {
     
            const validated = await loginSchema.safeParse(credentials)
    
            if (!validated.success)  return null

                const {password,email} = validated.data
                const user = await prisma.user.findUnique({
                    where:{email}
                })
                if(!user || !user.password) return null

                const compare = await bcrypt.compare(password,user.password)
                
                if (compare) {
                    return user
                }
                return null
            
     
  }})] } satisfies NextAuthConfig