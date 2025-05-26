import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const PodcastCardMobileSkeleton = () => {
  return (
    <Card className="w-full flex flex-row items-center h-[80px] rounded-lg overflow-hidden bg-white border-none shadow-none">

      <Skeleton className="h-[5.188rem] w-[4.909rem] rounded-[0.75rem] flex-shrink-0" />


      <div className="flex-1 flex flex-col py-3 px-3 gap-2">
        <Skeleton className="h-4 w-3/4" />

        <div className="space-y-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        <Skeleton className="h-3 w-20 mt-1" />
      </div>

      <div className="pr-2">
        <Skeleton className="h-4 w-4" />
      </div>
    </Card>
  )
}
