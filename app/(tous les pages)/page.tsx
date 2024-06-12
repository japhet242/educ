"use client"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function Home() {
const session = useSession() 

  return (
    <div>
      {JSON.stringify(session.data?.user)}
      <Button>Click me</Button>
     <button onClick={() => signOut()}>Sign Out</button>
     <Button><Link href="/dashboard"> du Tableau de Bord </Link></Button>
    </div>
  )
}
