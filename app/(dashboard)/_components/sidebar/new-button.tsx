"use client";
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";

import{
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Hint } from "@/components/hint";

export const NewButton=()=>{
    return(
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square ">
                    <Hint
                        label="Create new organization"
                        side="right"
                        align="start"
                        sideOffset={18}>
                        <button className="bg-white/60 h-full w-full rounded-md flex items-center justify-center hover:opacity-100 transition">
                            <Plus className="w-5 h-5 text-black" />
                        </button>  
                    </Hint>
                    
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                <CreateOrganization  />
            </DialogContent>
        </Dialog>
    )
}