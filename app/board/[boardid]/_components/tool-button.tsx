"use client";
import { Hint } from "@/components/hint";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolButtonProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isDisabled?: boolean;
    isActive?: boolean;
};

export const ToolButton = ({
    label,
    icon:Icon,
    onClick,
    isDisabled,
    isActive
}:ToolButtonProps)=>{
    return(
        <Hint label={label} side="right" sideOffset={14}>
            <Button 
                disabled={isDisabled}
                onClick={onClick}
                variant={isActive ? "boardActive":"board"}
                size="icon" >
                <Icon/>
            </Button>
        </Hint>
    );
};