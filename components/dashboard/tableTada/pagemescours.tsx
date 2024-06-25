import { DataTable } from "@/components/ui/data-table"
import { Payment, columns } from "./columns"
import { useQuery } from "@tanstack/react-query"
import { getMyCoursByUser, getMyCoursGestion } from "@/actions/cours-action"
import { auth } from "@/auth"


export default async function PageMesCours() {
    
    const session = await auth()
    const data = await getMyCoursByUser({email:session?.user.email || ""})
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
