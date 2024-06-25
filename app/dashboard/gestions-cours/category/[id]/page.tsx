import { CategoryForm } from "@/components/dashboard/category-form";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className=" max-w-[400px] min-h-[547px] bg-white p-[32px] rounded-xl shadow-md">
           <div className=" mb-2 text-center text-slate-500">
           Bienvenue sur la page d'ajout des catégories ! Ici, vous pouvez créer de nouvelles catégories pour mieux organiser vos contenus et faciliter la navigation. Commencez dès maintenant en remplissant les informations nécessaires ci-dessous.
           </div>
            <CategoryForm id={params.id}/>
        </div>
    )
  }