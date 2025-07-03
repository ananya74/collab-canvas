import{
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
}from "@/components/ui/tooltip";

export interface HintProps {
    label:string;
    children: React.ReactElement;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
};

export const Hint = ({
    label,
    children,
    side,
    align,
    sideOffset,
    alignOffset,
}:HintProps) => {
    return(
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    className="text-white bg-black border-black"
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}   
                    >
                    <p className="font-semibold capitalized">
                        {label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
    
};

