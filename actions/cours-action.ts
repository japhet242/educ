"use server"
import {z} from"zod"

import { categorySchema, titleChapitreSchema, CourSchema } from "@/zodschema/zod"
import prisma from "@/lib/db"
import { error } from "console";
import Mux from '@mux/mux-node';



const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET
});
export async function getUsers() {
  return prisma.user.findMany()
}

export async function titleCreat({ values,  instructorId }: { values: z.infer<typeof CourSchema>,  instructorId: string }) {
    
    const validated = await CourSchema.safeParse(values);
    if (validated.success) {
      try {
        const { title } = validated.data;
        const titleAd = await prisma.course.create({
            data: {
              title,
              instructorId
            }
          });
        return { id: titleAd.id };
      } catch (error) {
        console.log("Error creating course:", error);
        return { id: null, error: "Failed to create course" };
      }
    } else {
      console.log("Validation failed:", validated.error);
      return { id: null, error: "Validation failed" };
    }
  }
  export async function titleChapitreCreat({ title, id }: { title: z.infer<typeof titleChapitreSchema>; id: string }) {

    const validated = await titleChapitreSchema.safeParse(title);
    if (validated.success) {
      try {
        const { title } = validated.data;
      const titleAd = await prisma.chapter.create({
        data:{
          title,
          courseId:id
        }
      })
        return { id: titleAd.id };
      } catch (error) {
        console.log("Error creating course:", error);
        return { id: null, error: "Failed to create course" };
      }
    } else {
      console.log("Validation failed:", validated.error);
      return { id: null, error: "Validation failed" };
    }
  }
export async function getCoursById(id:string) {
        try {
            const cours= await prisma.course.findFirst({
            where:{id},
            include:{
              chapters:true
            }
            })
            return cours
        } catch (error) {
            console.log(error)
        }
}
export async function getChapitreById(id:string) {
  try {
      const chapitre = await prisma.chapter.findFirst({
      where:{id},
      include:{
        muxData:true
      }
      })
      return chapitre
  } catch (error) {
      console.log(error)
  }
}
export async function getCategory() {
  return await prisma.category.findMany()
}

export async function udapteChapitre({values,id}:{values:  { video?: string ; title?: string; content?: string; description?: string; isFree?: boolean },id:string}) {
    
  try {
      const chapitre = await prisma.chapter.update({
          where:{
              id
          },
          include:{
            muxData:true
          },
          data:{
              ...values
          }
      })
      
      if (values.video) {

       const existingMuxData = await prisma.muxData.findFirst({
          where:{chapterId:chapitre.id}
        })
        if (existingMuxData) {
          await mux.video.assets.delete(existingMuxData.assetId)
          await prisma.muxData.delete({
            where:{id:existingMuxData.id}
          })
        }
       
        const asset = await mux.video.assets.create({
          input: [{ url:values.video }],
          playback_policy: ['public'],
          test:false,
        });
        await prisma.muxData.create({
          data:{
            chapterId:chapitre.id,
            assetId:asset.id,
            playbackId:asset.playback_ids?.[0].id
          }
        })
        console.error(`Video ${values.video} enregistrée avec succès dans Mux pour le chapitre ${chapitre.id}`);
      }

      return chapitre
  } catch (error) {
      console.log(error)
  }
}
export async function udapte({values,id}:{values:{},id:string}) {
    
        try {
            const titleAd = await prisma.course.update({
                where:{
                    id
                },
                data:{
                    ...values
                }
            })
            return {id:titleAd.id}
        } catch (error) {
            console.log(error)
        }
}
export async function creatCategory({values}:{values: z.infer<typeof categorySchema>}) {
    const validated = await categorySchema.safeParse(values)
    if (validated.success) {
      const {category} = validated.data
        try {
      const categ= await prisma.category.findFirst({
        where:{name:category}
      })
      if (categ) {
        return {error:"la categorie existe deja dans la base de donnee"}
      }
      await prisma.category.create({
        data:{
          name:category
        }
      })
      return {success:"categorie ajoutee"}
  } catch (error) {
      console.log(error)
  }
    }

}
//recupere tous les posts pour la gestion des utilisateurs

export async function getMyCoursGestion() {
    return await prisma.course.findMany({
      include:{
        instructor:true
      },
      orderBy:{
        id:"desc"
      }
    })
}
export async function getMyCoursByUser({email}:{email:string}) {
  return await prisma.course.findMany({
    where:{
        instructor:{
          email
        }
    },
    include:{
      instructor:true
    },
    orderBy:{
      id:"desc"
    }
  })
}
export async function deleteCoursById(id:string) {
  try {
     const deletes = await prisma.course.delete({
    where:{id}
  })
  return {message :"cours supprimé avec succes"}
  } catch (error) {
    return {message :" echec cours non supprimé"}
  }
 
}