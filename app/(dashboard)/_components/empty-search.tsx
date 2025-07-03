import Image from "next/image";

export const EmptySearch = () => {
    return(
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/empty-search.svg"
                height={140}
                width={140}
                alt="empty"
            />
            <h2 className="text-2xl font-semibold text-gray-700 mt-6">
                No results found
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try searching for something else or check your spelling.
            </p>
        </div>
    );
};
export default EmptySearch;
