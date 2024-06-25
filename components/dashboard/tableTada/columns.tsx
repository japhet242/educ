"use client"

import { ColumnDef } from "@tanstack/react-table"
import { LuMoreHorizontal } from "react-icons/lu";
import { RiArrowUpDownLine } from "react-icons/ri";
import { Button } from "@/components/ui/button"
import { LuPencilLine } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { deleteCoursById } from "@/actions/cours-action";
import { redirect } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = { id: string; title: string; description: string | null; content: string | null; isFree: boolean; price: number | null; level: string | null; isPublished: boolean; photo1: string | null; photo2: string | null,instructor:{ id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  createdAt: Date;
  lastLogin: Date | null;
  profilePicture: string | null}}

 

  const handleDelete = async (id:string)=>{
    
      await deleteCoursById(id)
      
  }

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Titre
          <RiArrowUpDownLine  className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "instructor.email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <RiArrowUpDownLine  className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({column}) => (
      <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prix
          <RiArrowUpDownLine  className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("fr", {
        style: "currency",
        currency: "cfa",
      }).format(amount)
      return <div className="text-start font-medium ">{formatted}</div>
    },

  },
 
    {
      accessorKey:"isPublished",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize ">{row.getValue("isPublished") ? <span className=" bg-green-600 rounded-lg w-[60px] text-center p-1">publique</span> :<span className=" bg-slate-400 rounded-lg w-[62px] text-center p-1">privé</span>}</div>
      ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const payment = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <LuMoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link href={`/dashboard/new-cours/${payment.id}`} className=" flex space-x-2">
                  <LuPencilLine /> <span>editer</span>
                  </Link>
                  </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.title)}
                >
                  Copier le titre
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>handleDelete(payment.id)}>
                  <Button variant="link" className="text-red-500">supprimer</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    
  ]
  
