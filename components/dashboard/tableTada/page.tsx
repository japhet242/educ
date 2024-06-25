import { DataTable } from "@/components/ui/data-table"
import { Payment, columns } from "./columns"
import { useQuery } from "@tanstack/react-query"
import { getMyCoursGestion } from "@/actions/cours-action"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  const getcours = await getMyCoursGestion()
  return  getcours
}
export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="md:container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
