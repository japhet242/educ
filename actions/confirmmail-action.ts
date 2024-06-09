"use server"

import prisma from "@/lib/db"

export async function confirmMail({token}:{token:string | undefined}) {
let currentDate = new Date()
    const verif = await prisma.verificationToken.findFirst({
        where:{token}
    })
    if (!verif) {
        return {message:"le token de confirmation n'existe pas"}
    }
    const nonexpired =  currentDate < new Date(verif.expires) 
    if (!nonexpired) {
        return {message:"vous avez trop mis du temps avant de comfirmer la creation de votre compte . recree le compte"}
    }

    if (nonexpired) {
        await prisma.user.update({
            where:{email:verif.email},
            data:{
                emailVerified:new Date()
            }
        })
        await prisma.verificationToken.delete({
            where:{email:verif.email}
        })
    }
     
}