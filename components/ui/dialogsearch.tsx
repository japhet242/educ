import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SearhForm } from "../home/search"

export function DialogSearchButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">recherche</Button>
      </DialogTrigger>
      <DialogContent className=" w-full">
        <SearhForm/>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        
      </DialogContent>
    </Dialog>
  )
}
