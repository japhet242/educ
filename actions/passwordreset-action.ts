"use server"
import z from"zod"
import { RessetSchema, loginSchema } from "@/zodschema/zod"
import prisma from "@/lib/db"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { tokengenerate } from "@/lib/resend/token"
import { MailReset } from "@/lib/resend/mailreset"
import { tokengenerateReset } from "@/lib/resend/tokenresetpassword"



export  async function resetAction(values: z.infer<typeof RessetSchema>) {

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const valited = await RessetSchema.safeParse(values)
    if (valited.success) {

      const {email} = valited.data
      const user = await prisma.user.findUnique({
        where:{email}
      })

      if (!user) {
        return {error:"le compte n'existe pas"}
      }
      if (!user.emailVerified) {
        return {error:"verifier votre boite email car un maila  été envoyer "}
      }
     
      const tokenCreat = await tokengenerateReset({email})
    await MailReset({token:tokenCreat.token,email:tokenCreat.email})
 
      return {success:"Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse e-mail. Veuillez vérifier votre boîte de réception et suivre les instructions pour réinitialiser votre mot de passe."}
    }
    
    return{error :"quelque chose s'est mal passé"}
    
  }