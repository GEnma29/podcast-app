import React, { useEffect, useRef } from "react"
import type { ReactNode } from "react"

interface InfiniteScrollProps<T> {
  data: T[] | undefined
  renderItem: (item: T, index: number) => ReactNode
  itemsPerPage: number
  isLoading: boolean
  hasMore: boolean
  onLoadMore: () => void
  loadingComponent?: ReactNode
}

export function InfiniteScroll<T>({
  data,
  renderItem,
  isLoading,
  hasMore,
  onLoadMore,
  loadingComponent = <div className="py-4 text-center">Loading more...</div>,
}: InfiniteScrollProps<T>) {
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasMore || isLoading) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !isLoading) {
          onLoadMore()
        }
      },
      { threshold: 0.1 },
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [isLoading, hasMore, onLoadMore])

  if (!data) return null


  return (
    <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
       {data.map((item, index) => (
        <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>
      ))}

      {hasMore && (
        <div ref={loaderRef} className="w-full">
          {isLoading && loadingComponent}
        </div>
      )}
    </div>
  )
}
