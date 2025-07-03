"use client";

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import React from "react";
import { memo } from "react";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Triangle } from "./triangle";
import { Text } from "./text";
import { Note } from "./note";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";


interface LayerPreviewProps {
    id: string;
    onLayerPointerDown:(e:React.PointerEvent,layerId:string)=>void;
    selectionColor?:string;
};

export const LayerPreview = memo(({
    id,
    onLayerPointerDown,
    selectionColor,
}:LayerPreviewProps)=>{

    const layer=useStorage((root)=>root.layers.get(id));
    if (!layer) {
        return null;
    }

    switch (layer.type) {
        case LayerType.Rectangle:
            return(
                <Rectangle
                    id={id}
                    layer={layer}
                    onPointerDown={(e) => onLayerPointerDown(e, id)}
                    selectionColor={selectionColor}
                />
            );
        case LayerType.Ellipse:
            return(
                <Ellipse
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            )
        case LayerType.Triangle:
            return(
                <Triangle
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor} 
                />
            );
        case LayerType.Text:
            return(
                <Text
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );
        case LayerType.Note:
             return(
                <Note
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );
        case LayerType.Path:
           return (
            <Path
                key = {id}
                points={layer.points}
                onPointerDown={(e) => onLayerPointerDown(e,id)}
                x={layer.x}
                y={layer.y}
                fill={layer.fill ? colorToCss(layer.fill) : "#000"}
                stroke={selectionColor}
            />
           )

        

        default:
            console.warn(`Unsupported layer type: ${layer}`);
            return null;
    }
});

LayerPreview.displayName = "LayerPreview";