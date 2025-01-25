import { Skeleton } from "@/components/ui/skeleton"
 
export function DeckListLoadingSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-2">
        <Skeleton className="h-[7vh] w-[80vw] lg:w-[50vw]" />
      </div>
    </div>
  )
}