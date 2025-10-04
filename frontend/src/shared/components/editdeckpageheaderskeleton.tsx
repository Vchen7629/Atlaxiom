import { Skeleton } from "../ui/skeleton"

export function EditDeckHeaderSkeleton() {
    return (
        <header className="flex justify-between items-center p-5 w-full h-[17vh] bg-gradient-to-t from-[hsl(var(--homepagegradient1))] to-[hsl(var(--homepagegradient3))]">
            <section className="flex flex-col h-full w-full justify-between">
                <Skeleton className="h-10 w-[20%] bg-gray-300"/>
                <Skeleton className="h-6 w-[15%] bg-gray-300"/>
                <Skeleton className="h-6 w-[17%] bg-gray-300"/>           
            </section>
            <Skeleton className="h-12 w-[8%] mr-2 rounded-lg bg-blue-400"/>
        </header>
    )
}