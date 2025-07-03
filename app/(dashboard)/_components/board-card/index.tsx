"use client";
import Link
 from "next/link";
import Image from "next/image";
import { Overlay } from "./overlay";
import {formatDistanceToNow} from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";



interface BoardCardProps {
    id: string;
    title: string;
    imageUrl?: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    orgId: string;
    isFavorite?: boolean;
}
export const BoardCard = ({
    id,
    title,
    imageUrl,
    authorName,
    authorId,
    createdAt,
    orgId,
    isFavorite ,
}:BoardCardProps) => {
    const {userId}=useAuth();
    const authorLabel=userId===authorId
        ? "You":authorName;
    const createdAtLabel=formatDistanceToNow(createdAt, {
        addSuffix: true,
    });

    const {
        mutate:onFavorite,
        pending:pendingFavorite,
    }=useApiMutation(api.board.favorite);

    const {
        mutate:onUnFavorite,
        pending:pendingUnFavorite,
    }=useApiMutation(api.board.unfavorite);

    const toggleFavorite = () => {
        if (isFavorite) {
            onUnFavorite({ id }).catch(() => toast.error("failed to unfavorite"));
        } else {
            onFavorite({ id, orgId }).catch(() => toast.error("failed to favorite"));
        }
    };

    return(
         <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden ">
                <div className="relative flex-1 bg-amber-50">
                    <Image
                        src={imageUrl || "/default-image.png"}
                        alt={title}
                        fill
                        className="object-fit"
                    />
                    <Overlay />
                    <Actions
                        id={id}
                        title={title}
                        side="right"
                    >
                        <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
                        </span>
                    </Actions>
                        
                </div>
                <Footer
                    isFavorite={isFavorite}
                    title={title}
                    authorLabel={authorLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={toggleFavorite}
                    disabled={pendingFavorite||pendingUnFavorite}
                />
            </div>
        </Link>
    );
};

BoardCard.Skeleton=function BoardCardSkeleton(){
    return(
        <div className="aspect-[100/127]  rounded-lg  overflow-hidden ">
            <Skeleton className="h-full w-full"/>
        </div>
    )
}