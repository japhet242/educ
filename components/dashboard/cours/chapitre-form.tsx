"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChapitreSchema } from "@/zodschema/zod"
import { useEffect, useState, useTransition } from 'react';
import { useMutation } from "@tanstack/react-query"
import { LuPencilLine } from "react-icons/lu";
import { getCategory, getChapitreById, udapte, udapteChapitre } from "@/actions/cours-action"
import { useRouter } from "next/navigation"
import Tiptap from "@/components/Tiptap/Tiptap"
import DOMPurify from 'dompurify';
import { UploadDropzone } from "@/utils/uploadthing"
import Image from "next/image"
import MuxPlayer from"@mux/mux-player-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { GiTakeMyMoney } from "react-icons/gi"
import { Chapitre } from "./Chapitre"
import { CiGrid31 } from "react-icons/ci";
import { Checkbox } from "@/components/ui/checkbox"
import { FaRegEye } from "react-icons/fa";
import TiptapChapitre from "@/components/Tiptap/TiptapChapitre"
import { MdOutlineVideocam } from "react-icons/md";
import { Editeur } from "@/utils/editor"
import parse from 'html-react-parser';  // Importer html-react-parser

export function ChapitreForm({ params }: { params: { id: string } }) {
  const [isPending, startTransition] = useTransition()
  const [initialContent, setinitialContent] = useState<undefined|string>("")
  const [initialImage, setInitialImage] = useState<undefined|string|null>("")
  const [initialVideo, setInitialVideo] = useState<undefined|string>("")
  const [initialTitre, setInitialTitre] = useState<string>("")
  const [initialisFree, setinitialisFree] = useState<undefined|boolean>(true)
  const [initialDescription, setInitialDescription] = useState<string>("") // Changed to ensure initialDescription is never undefined
  const [visibleDescription, setVisibleDescription] = useState(false)
  const [visibleImage, setVisibleImage] = useState(false)
  const [visibleisFree, setvisibleisFree] = useState(false)
  const [visible, setVisible] = useState(false)
  const [VisibleContent, setVisibleContent] = useState<undefined| boolean>(false)


  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof ChapitreSchema>>({
    resolver: zodResolver(ChapitreSchema),
    defaultValues: {
      title: initialTitre,
      description: initialDescription,
      content:initialContent,
      isFree:initialisFree
    
    },
  })
  const cleanHTMLConfig = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'div', 'span', 'ul', 'ol','p','h1','h2','h3','h4','blockquote'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style']
  }
  // Fetch the initial title
  useEffect(() => {
    async function get() {
      const data = await getChapitreById(params.id)
      setInitialTitre(data?.title || "")
      setInitialDescription(data?.description || "") // Ensure initialDescription is a string
      setInitialImage(data?.video ?? "")
      setinitialisFree(data?.isFree)
      setinitialContent(data?.content ?? "")
      setInitialVideo(data?.muxData?.playbackId || "")
    }
    get()
  }, [params.id]) // Run this effect when params.id changes

  // Update the form's default values when initialTitre or initialDescription changes
  useEffect(() => {
    if (initialTitre || initialDescription) {
      form.reset({ title: initialTitre, description: initialDescription,isFree:initialisFree ,content:initialContent}) // Reset the form with the new title and description
    }
  }, [initialTitre, initialDescription, form]) // Dependencies: run this effect when initialTitre, initialDescription, or form changes

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof ChapitreSchema>) => {
      try {
        console.log(values)
     const chapitre = await udapteChapitre({ values, id: params.id })
        setInitialTitre(values.title)
        setinitialContent(values.content || "")
        setInitialDescription(values.description || "") // Ensure initialDescription is a string
        setinitialisFree(values.isFree)
        setInitialVideo(chapitre?.muxData?.playbackId || "")
        setVisible(false)
        setVisibleDescription(false)
        setVisibleContent(false)
        setvisibleisFree(false)
        
        
      } catch (error) {
        console.log(error)
      }
    }
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ChapitreSchema>) {
    startTransition(async () => {
      await mutation.mutateAsync(values)
    });
  }

  const handleVisible = () => {
    setVisible(v => !v)
  }
  const handleVisibleDescription = () => {
    setVisibleDescription(v => !v)
  }
  const handleVisibleImage = () => {
    setVisibleImage(v => !v)
  }
  const handleVisibleContent = () => {
    setVisibleContent(v => !v)
  }
  const handlevisibleisFree = () => {
    setvisibleisFree(v => !v)
  }
  return (
    <div className=" md:grid grid-cols-2 space-x-4 bg " >
       
    <div className="mt-4 space-y-4 ">
            <div className=" flex items-center space-x-4 text-xl font-bold ">
                        <div className=" bg-blue-300 rounded-2xl p-2">
                           <CiGrid31 size={24}/>  
                        </div>
                    <span>
                    Personnalise ton chapitre
                    </span>
                      
             </div>
      <div className="bg-slate-100 rounded-lg p-2">
        <div className="flex justify-between mb-1">
          <div className=" font-bold">
           Titre du chapitre
          </div>
          <Button variant="link" onClick={handleVisible}>
            {!visible ? <div className=" font-bold flex items-center space-x-2">  <LuPencilLine />éditer</div> : <div>annuler</div>}
          </Button>
        </div>
        {!visible && <p className="text-sm">{initialTitre}</p>}
        {visible && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} className="bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="text-white" variant="custum">enregisté</Button>
            </form>
          </Form>
        )}
      </div>

      <div className="bg-slate-100 rounded-lg p-2">
        <div className="flex justify-between mb-1">
          <div className=" font-bold">
          Description du cours 
          </div>
          <Button variant="link" onClick={handleVisibleDescription}>
            {!visibleDescription ? <div className=" font-bold flex items-center space-x-2"> <LuPencilLine />éditer</div> : <div>annuler</div>}
          </Button>
        </div>
        {!visibleDescription && initialDescription && <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(initialDescription,cleanHTMLConfig) }}></div>}
        {visibleDescription && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Tiptap description={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="text-white" variant="custum">enregisté</Button>
            </form>
          </Form>
        )}
      </div>

      <div className="bg-slate-100 rounded-lg p-2">
        <div className="flex justify-between mb-1">
          <div className=" font-bold">
          contenu du chapitre 
          </div>
          <Button variant="link" onClick={handleVisibleContent}>
            {!VisibleContent ? <div className=" font-bold flex items-center space-x-2"> <LuPencilLine />éditer</div> : <div>annuler</div>}
          </Button>
        </div>
        {!VisibleContent && initialContent && <div>{parse(initialContent)}</div>}
        {VisibleContent && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {/* <Editeur value={field.value} onChange={field.onChange}/> */}
                      <TiptapChapitre description={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="text-white" variant="custum">enregisté</Button>
            </form>
          </Form>
        )}
      </div>
      
      <div className=" flex items-center space-x-4 text-xl font-bold ">
        <div className=" bg-blue-300 rounded-2xl p-2">
        <FaRegEye size={24}/>
        </div>
          <span>Paramètres d'accès</span>
      </div>

      <div className="bg-slate-100 rounded-lg p-2">
        <div className="flex justify-between mb-1">
          <div className=" font-bold">
          Chapitre d'aperçu gratuit
          </div>
          <Button variant="link" onClick={handlevisibleisFree}>
            {!visibleisFree ? <div className=" font-bold flex items-center space-x-2">  <LuPencilLine />éditer</div> : <div>annuler</div>}
          </Button>
        </div>
        {!visibleisFree && <div className="text-sm">{initialisFree ? <p>gratuit</p>: <p>payant</p>}</div>}
        {visibleisFree && (
              <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="isFree"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormDescription>
                        Cochez cette case si vous souhaitez rendre ce chapitre gratuit pour l'aperçu
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="custum">enregisté</Button>
              </form>
            </Form>
        )}
      </div>
    </div>

    <div>
    <div className=" flex items-center space-x-4 text-xl font-bold mt-5 mb-3">
                        <div className=" bg-blue-300 rounded-2xl p-2">
                        <MdOutlineVideocam />
                        </div>
                    <span>
                    Ajouter une video
                    </span>
                      
             </div>
    <div className="bg-slate-100 rounded-lg p-2 max-md:mt-4">
      <div className="flex justify-between mb-1">
          <div className=" font-bold">
           video (facultatif)
          </div>
          <Button variant="link" onClick={handleVisibleImage}>
            {!visibleImage ? <div className=" font-bold flex items-center space-x-2"> <LuPencilLine />éditer</div> : <div>annuler</div>}
          </Button>
        </div>
        {visibleImage ? <UploadDropzone
        className=" relative z-0 "
        endpoint="videoChapitre"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          startTransition(async () => {
           const videos = await udapteChapitre({ values:{video:res[0].url}, id: params.id })
            setInitialVideo(videos?.muxData?.playbackId || "")
            setVisibleImage(false)
            router.refresh()
          });
          alert("video enregistree avec succes");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /> : initialVideo?.length ?  <MuxPlayer playbackId={initialVideo} className=" h-[300px]"/> : <div className=" h-[300px] w-[400px] flex items-center justify-center"> <MdOutlineVideocam size={20} /></div>} 
      </div>
    </div>
    </div>
  )
}
