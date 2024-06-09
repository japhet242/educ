"use server"
import z from"zod"
import { loginSchema } from "@/zodschema/zod"
import prisma from "@/lib/db"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"



export  async function loginAction(values: z.infer<typeof loginSchema>) {

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const valited = await loginSchema.safeParse(values)
    if (valited.success) {

      const {password,email} = valited.data
      const user = await prisma.user.findUnique({
        where:{email}
      })

      if (!user) {
        return {error:"le compte n'existe pas"}
      }
      if (!user.emailVerified) {
        return {error:"verifier votre boite email car un maila  été envoyer pour confirmer la création de votre compte ou encore recomencer avec la creation"}
      }
      try {
        await signIn("credentials",{
          password,
          email,
          redirectTo:"/"
      })

      
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case "CredentialsSignin":
              return {error:"quelque chose s'est mal passé"}
              break;
          
            default:
              return {error:"quelque chose s'est mal produite verifier votre mot de passe il semble être incorrect"}
              break;
          }
        }
        
      }
 
      return {success:"vous êtes connecté ,Retourner a la page d'acceuil"}
    }
    
    return{error :"quelque chose s'est mal passé"}
    
  }