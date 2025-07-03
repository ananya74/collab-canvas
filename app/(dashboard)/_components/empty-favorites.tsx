import Image from "next/image";

export const EmptyFavorites = () => {
    return(
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/empty-favorites.svg"
                height={140}
                width={140}
                alt="empty"
            />
            <h2 className="text-2xl font-semibold text-gray-700 mt-6">
                No favorites found
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try adding some boards to your favorites to see them here.
            </p>
        </div>
    );
};
export default EmptyFavorites;
