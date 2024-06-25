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
import { CourSchema } from "@/zodschema/zod"
import { useEffect, useRef, useState, useTransition } from 'react';
import { useMutation } from "@tanstack/react-query"
import { LuPencilLine } from "react-icons/lu";
import { getCategory, getCoursById, udapte } from "@/actions/cours-action"
import { useRouter } from "next/navigation"
import Tiptap from "@/components/Tiptap/Tiptap"
import DOMPurify from 'dompurify';
import { UploadDropzone } from "@/utils/uploadthing"
import Image from "next/image"
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
import { MdUnpublished } from "react-icons/md";
import { MdPublishedWithChanges } from "react-icons/md";
import type { ConfettiRef } from "@/components/magicui/confetti";



export function CoursForm({ params }: { params: { id: string } }) {
  const [isPending, startTransition] = useTransition()
  const [tableauCategory, setTableauCategory] = useState<undefined|{ id: string; name: string; }[]>([])
  const [initialCategory, setInitialCategory] = useState<undefined|string>("")
  const [initialImage, setInitialImage] = useState<undefined|string>("")
  const [initialTitre, setInitialTitre] = useState<undefined|string>("")
  const [initialMontant, setInitialMontant] = useState<undefined|number>(undefined)
  const [initialDescription, setInitialDescription] = useState<string>("") // Changed to ensure initialDescription is never undefined
  const [visibleDescription, setVisibleDescription] = useState(false)
  const [visibleImage, setVisibleImage] = useState(false)
  const [visibleMontant, setVisibleMontant] = useState(false)
  const [visible, setVisible] = useState(false)
  const [visibleCategorie, setVisibleCategorie] = useState<undefined| boolean>(false)
  const [publier , setPublier] = useState<boolean | undefined>(true)


  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof CourSchema>>({
    resolver: zodResolver(CourSchema),
    defaultValues: {
      title: initialTitre,
      description: initialDescription,
      category:initialCategory,
      price:initialMontant
    },
  })

  // Fetch the initial title
  useEffect(() => {
    async function get() {
      const data = await getCoursById(params.id)
    
      setInitialTitre(data?.title)
      setInitialDescription(data?.description || "") // Ensure initialDescription is a string
      setInitialImage(data?.photo1 ?? "")
      setInitialCategory(data?.category || "")
      setInitialMontant(data?.price || undefined)
      setPublier(data?.isPublished)
      const categories = await getCategory()
     setTableauCategory(categories)
    }
    get()
  }, [params.id]) // Run this effect when params.id changes

  // Update the form's default values when initialTitre or initialDescription changes
  useEffect(() => {
    if (initialTitre || initialDescription) {
      form.reset({ title: initialTitre, description: initialDescription,price:initialMontant }) // Reset the form with the new title and description
    }
  }, [initialTitre, initialDescription, form]) // Dependencies: run this effect when initialTitre, initialDescription, or form changes

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof CourSchema>) => {
      try {
        await udapte({ values, id: params.id })
        setInitialTitre(values.title)
        setInitialCategory(values.category)
        setInitialDescription(values.description || "") // Ensure initialDescription is a string
        setInitialMontant(values.price)
        setVisible(false)
        setVisibleDescription(false)
        setVisibleCategorie(false)
        setVisibleMontant(false)
        
        
      } catch (error) {
        console.log(error)
      }
    }
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CourSchema>) {
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
  const handleVisibleCategorie = () => {
    setVisibleCategorie(v => !v)
  }
  const handleVisibleMontant = () => {
    setVisibleMontant(v => !v)
  }
  return (
    <div className=" md:grid grid-cols-2 space-x-4" >
    <div className="mt-4 space-y-4">
{/* // bouton pour rendre la page publique ou non  */}
     <Button variant="link" onClick={async ()=>{
      await udapte({ values:{isPublished:!publier}, id: params.id })
      setPublier(v=>!v)
     }}>
      {!publier ? <span className="bg-red-200 p-2 rounded-lg text-white flex items-center"> <MdUnpublished /> Non publier</span> : <span className="bg-green-500 text-white p-2 rounded-lg flex items-center"><MdPublishedWithChanges /> Publier</span>}
     </Button>

    <div className=" flex items-center space-x-4 text-xl font-bold ">
                        <div className=" bg-blue-300 rounded-2xl p-2">
                           <CiGrid31 size={24}/>  
                        </div>
                    <span>
                    Personnalise ton cours
                    </span>
                    </div>
      <div className="bg-slate-100 rounded-lg p-2">
        <div className="flex justify-between mb-1">
          <div className=" font-bold">
           Titre du cours
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
        {!visibleDescription && initialDescription && <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(initialDescription) }}></div>}
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
            image du cours
          </div>
          <Button variant="link" onClick={handleVisibleImage}>
            {!visibleImage ? <div className=" font-bold flex items-center space-x-2"> <LuPencilLine />éditer</div> : <div>annuler</div>}
          </Button>
        </div>
        {visibleImage ? <UploadDropzone
        className=" relative z-0 "
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          startTransition(async () => {
            await udapte({ values:{photo1:res[0].url}, id: params.id })
            setInitialImage(res[0].url)
            setVisibleImage(false)
          });
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /> : initialImage?.length ? <Image src={initialImage || ""} alt={initialImage || ""} width={450} height={100} className=" rounded-lg"/> : ""} 
      </div>

     <div className="bg-slate-100 rounded-lg p-2">
        <div className="flex justify-between mb-1">
          <div className=" font-bold">
            Categorie
          </div>
          <Button variant="link" onClick={handleVisibleCategorie}>
            {!visibleCategorie ? <div className=" font-bold flex items-center space-x-2">  <LuPencilLine />éditer</div> : <div>annuler</div>}
          </Button>
        </div>
        {!visibleCategorie && <p className="text-sm">{initialCategory}</p>}
        {visibleCategorie && (
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className=" bg-white">
                    <SelectValue placeholder="Selectionne une categorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tableauCategory && tableauCategory.map(data=>{
                    return(
                      <SelectItem value={data.name} key={data.id}>{data.name}</SelectItem>
                    )
                  })}
                  <hr className=" my-1"/>
                  <Button className=" text-cente text-blue-400" variant="link">
                    <Link href={`/dashboard/gestions-cours/category/${params.id}`}> ajouter une nouvelle categorie</Link>
                  </Button>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit" variant="custum" className=" text-white">enregisté</Button>
      </form>
    </Form>
        )}
      </div>
      <div className=" flex items-center space-x-4 text-xl font-bold ">
        <div className=" bg-blue-300 rounded-2xl p-2">
        <GiTakeMyMoney size={24}/>
        </div>
          <span>Prix du cours</span>
      </div>

      <div className="bg-slate-100 rounded-lg p-2">
        <div className="flex justify-between mb-1">
          <div className=" font-bold">
           montant (en FCFA)
          </div>
          <Button variant="link" onClick={handleVisibleMontant}>
            {!visibleMontant ? <div className=" font-bold flex items-center space-x-2">  <LuPencilLine />éditer</div> : <div>annuler</div>}
          </Button>
        </div>
        {!visibleMontant && <p className="text-sm">{initialMontant}</p>}
        {visibleMontant && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="price"
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
    </div>

    <div>
      <Chapitre id={params.id}/>
    </div>
    </div>
  )
}
