import { Skeleton } from "@/components/ui/skeleton"
 
export function EditDeckPageSidebarSkeleton() {
  return (
    <header className="flex flex-col w-full h-full pt-4 space-y-2">
        <div className="flex justify-between items-center mb-2">
            <div className="flex rounded-lg bg-footer text-sm">
                <Skeleton className="w-20 h-7 bg-[hsl(var(--background3))]"/>
                <Skeleton className="w-20 h-7 bg-footer"/>
            </div>
            <Skeleton className="w-16 h-10 bg-footer"/>
        </div>
        <div className="flex w-full items-center space-x-1">
            <Skeleton className="w-[60%] h-10 bg-gray-400"/>
            <Skeleton className="w-[20%] h-10 bg-blue-400"/>
            <Skeleton className="w-[10%] h-8 bg-gray-400"/>
            <Skeleton className="w-[10%] h-8 bg-gray-400"/>
        </div>
        <div className="h-[80%] w-full pt-16">
            <Skeleton className="h-full w-full rounded-lg bg-[hsl(var(--editdeckdraganddropbackground))]" />
        </div>
    </header>
  )
}