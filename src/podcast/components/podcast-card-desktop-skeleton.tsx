import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const PodcastCardDesktopSkeleton = () => {
  return (
    <Card className="w-full max-w-[271px] h-[344px] rounded-lg overflow-hidden relative bg-gray-200">
      <Skeleton className="absolute inset-0" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>

      <div className="relative z-20 flex flex-col h-full p-4">
        <CardHeader className="p-0 pb-4">
          <div className="flex justify-end w-full">

            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        </CardHeader>

        <CardContent className="p-0 pb-4 text-sm text-white"></CardContent>

        <CardFooter className="flex flex-col px-2 mt-auto p-0 gap-3">
  
          <div className="w-full">
            <Skeleton className="h-5 w-4/5 bg-white/20" />
          </div>

    
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-full bg-white/20" />
            <Skeleton className="h-4 w-full bg-white/20" />
            <Skeleton className="h-4 w-3/4 bg-white/20" />
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
