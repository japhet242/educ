"use server"
import z from"zod"
import prisma from "@/lib/db"
import bcrypt from"bcryptjs"
import { newpassworSchema } from "@/zodschema/zod"

export async function confirmReset({token,password}:{token:string | undefined ,password:z.infer<typeof newpassworSchema>}) {
    const valited =await newpassworSchema.safeParse(password)
    if (!valited.success) {
        return {error:"quelque chose de mal s'est produite"}
    }
    const data = valited.data
let currentDate = new Date()
    const verif = await prisma.vesetEmailToken.findFirst({
        where:{token}
    })
    if (!verif) {
        return {error:"le token de confirmation n'existe pas"}
    }
    const nonexpired =  currentDate < new Date(verif.expires) 
    if (!nonexpired) {
        return {error:"vous avez trop mis du temps avant de comfirmer la Réinitialisation de Mot de Passe. recree le compte"}
    }
 
    if (nonexpired) {

        const hashPassword = await bcrypt.hash(data.password,10)
        await prisma.user.update({
            where:{email:verif.email},
            data:{
               password:hashPassword
            }
        })
        await prisma.vesetEmailToken.delete({
            where:{email:verif.email}
        })
        return {success:"Mot de Passe modifier"}
    }
     
}