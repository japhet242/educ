"use server"
import z from"zod"
import { registerSchema } from "@/zodschema/zod"
import prisma from "@/lib/db"
import bcrypt from"bcryptjs"
import { tokengenerate } from "@/lib/resend/token"
import { MailConfirm } from "@/lib/resend/mailconfirme"
export  async function registerAction(values: z.infer<typeof registerSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const validated = registerSchema.safeParse(values)

    if(!validated.success) return {error:"quelque chose s'est mal passé"}

    const{email,name,password} =validated.data

   const user = await prisma.user.findUnique({
    where:{email}
   })
   if(user && user.emailVerified){
        return {error:"le compte existe deja"}
   }
   if (user && !user.emailVerified) {
     await prisma.user.delete({
      where:{id:user.id}
     })
   }
   const hashPassword = await bcrypt.hash(password,10)
   const creatUser = await prisma.user.create({
    data:{
      email,
      password:hashPassword,
      name
    }
   })
   const tokenCreat = await tokengenerate({email})
   await MailConfirm({token:tokenCreat.token,email:tokenCreat.email})
   
   return{success:"un mail de confirmation a été envoyer veiller entrer dans le mail pour confirmer la creation de votre compte"}
  }