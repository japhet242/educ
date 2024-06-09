"use client"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function Home() {
const session = useSession() 

  return (
    <div>
      welcome to dashboard
      
     <button onClick={() => signOut()}>Sign Out</button>

    </div>
  )
}
