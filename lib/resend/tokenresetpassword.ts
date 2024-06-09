import { v4 as uuidv4 } from 'uuid'
import prisma from '../db';

export async function tokengenerateReset({email}:{email:string}) {
    let currentDate = new Date();
    console.log("Heure actuelle : " + currentDate.toLocaleTimeString());
    let oneHourInMillis = 60 * 60 * 1000; // 60 minutes * 60 secondes * 1000 millisecondes
    const expires= new Date(currentDate.getTime() + oneHourInMillis);
  const token = await uuidv4();
const verifToken = await prisma.verificationToken.findFirst({
    where:{email}
})
if (verifToken) {
    await prisma.verificationToken.delete({
        where:{email:verifToken.email}
    })
}
  const creatToken = await prisma.vesetEmailToken.create({
    data:{
            expires:expires.toString(),
            email,
            token
    }
  })
  return creatToken
    
}