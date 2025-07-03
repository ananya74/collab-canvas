"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bound";
import { useMutation, useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layer";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

interface SelectionToolsProps{
    camera:Camera,
    setLastUsedColor:(color:Color)=>void;
};

export const SelectionTools=memo((
    {
        camera,
        setLastUsedColor,
    }:SelectionToolsProps
)=>{

    const selection=useSelf((me)=>me.presence.selection);


    const moveToBack=useMutation((
        {storage}
    )=>{
        const liveLayerIds=storage.get("layerIds");
        const indice:number[]=[];

        const arr=liveLayerIds.toImmutable();

        for(let i=0;i<arr.length;i++){
            if(selection.includes(arr[i])){
                indice.push(i);
            }
        }

        for(let i=0;i<indice.length;i++){
            liveLayerIds.move(indice[i],i);
        }
    },[selection]);




    const moveToFront=useMutation((
        {storage}
    )=>{
        const liveLayerIds=storage.get("layerIds");
        const indice:number[]=[];

        const arr=liveLayerIds.toImmutable();

        for(let i=0;i<arr.length;i++){
            if(selection.includes(arr[i])){
                indice.push(i);
            }
        }

        for(let i=indice.length-1;i>=0;i--){
            liveLayerIds.move(indice[i],arr.length-1-(indice.length-1-i));
        }
    },[selection]);


   



    const setFill=useMutation((
        {storage},
        fill:Color,
    )=>{
        const liveLayers=storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id)=>{
            liveLayers.get(id)?.set("fill",fill);
        })
    },[selection,setLastUsedColor]);


    const deleteLayers=useDeleteLayers();

    const selectionBound=useSelectionBounds();

    if(!selectionBound){
        return null;
    }

    const x=selectionBound.width/2+selectionBound.x+camera.x;
    const y=selectionBound.y+camera.y;

    

    return(
        <div
            className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none "
            style={{
                transform: `translate(
                    calc(${x}px - 50%), 
                    calc(${y - 16}px - 100%)
                )`,
            }}
        >
            <ColorPicker
                onChange={setFill}
            />

            <div className="flex flex-col gap-y-0.5">
                <Hint label="Bring To Front">
                    <Button
                        onClick={moveToFront}
                        variant="board"
                        size="icon"
                    >
                        <BringToFront/>
                    </Button>
                </Hint>

                <Hint label="Send To Back" side="bottom">
                    <Button
                        onClick={moveToBack}
                        variant="board"
                        size="icon"
                    >
                        <SendToBack/>
                    </Button>
                </Hint>
                

            </div>


            <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
                <Hint label="Delete">
                    <Button
                        
                        variant="board"
                        size="icon"
                        onClick={deleteLayers}
                    >
                        <Trash2/>

                    </Button>
                </Hint>

            </div>
        </div>
    );
});

SelectionTools.displayName="SelectionTools";