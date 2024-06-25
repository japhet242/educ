import { Button } from "../ui/button";
import Link from "next/link";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CiHome } from "react-icons/ci";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { FaUserPlus } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { FaUsersCog } from "react-icons/fa";

export function Navigation() {
    return(
        <nav className=" md:mt-[66px] space-y-2">
        <Button variant="ghost" className=" w-full space-x-4 justify-start text-lg">
                 <CiHome  size={24}/>
                <Link href="/">
                    Acceuil
                </Link>
            </Button>
            <Button variant="ghost" className=" w-full space-x-4 justify-start text-lg bg-[#695fd0] md:bg-[#4338ca]">
            <MdOutlineRemoveRedEye size={24}/>
                <Link href="/dashboard">
                    Aperçu
                </Link>
            </Button>
            <Button variant="ghost" className=" w-full space-x-4 justify-start text-lg">
            <FaUserShield size={24}/>
                <Link href="#">
                Administration
                </Link>
            </Button>
            <Button variant="ghost" className=" w-full space-x-4 justify-start text-lg">
            <FaChalkboardTeacher size={24}/>
                <Link href="#">
                    Cours en cours
                </Link>
            </Button>
            <Button variant="ghost" className=" w-full space-x-4 justify-start text-lg">
            <FaLightbulb size={24}/>
                <Link href="#">
                Recommandations
                </Link>
            </Button>
            <Button variant="ghost" className=" w-full space-x-4 justify-start text-lg">
            <FaHistory size={24}/>
                <Link href="#">
                Activité récente 
                </Link>
            </Button>
            <Button variant="ghost" className=" w-full space-x-4 justify-start text-lg">
            <FaEdit  size={24}/>
                <Link href="/dashboard/gestions-cours">
                Gestion des cours
                </Link>
            </Button>
            <Button variant="ghost" className=" w-full space-x-4 justify-start text-lg">
            <FaChartBar size={24}/>
                <Link href="#">
                Statistiques
                </Link>
            </Button>
            <Button variant="ghost" className=" w-full space-x-4 justify-start text-lg">
            <GiTeacher size={24}/>
                <Link href="/dashboard/mes-cours">
                Mes cours
                </Link>
            </Button>
            <Button variant="ghost" className=" w-full space-x-4 justify-start text-lg">
            <FaUserPlus size={24}/>
                <Link href="#">
               Demandes
                </Link>
            </Button>
            <Button variant="ghost" className=" w-full space-x-4 justify-start text-lg">
            <FaCog size={24}/>
                <Link href="#">
                Paramètres
                </Link>
            </Button>
            <Button variant="ghost" className=" w-full space-x-4 justify-start text-lg">
            <FaUsersCog size={24}/>
                <Link href="/dashboard/utilisateurs">
               Utilisateurs
                </Link>
            </Button>
            <Button variant="ghost" className=" w-full space-x-4 justify-start text-lg" onClick={()=>signOut()}>
            <FaSignOutAlt size={24}/>
            <div>
                    Déconnexion 
            </div>
            </Button>
            
        </nav>
    )
}