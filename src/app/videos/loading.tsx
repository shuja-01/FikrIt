export default function VideosLoadingSkeleton() {
  return (
    <main className="min-h-screen bg-brand-sand pt-24 px-6 md:px-12 lg:px-24 pb-20">
      <div className="max-w-6xl mx-auto animate-pulse">
        
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="h-10 md:h-12 w-64 bg-gray-200/60 rounded-lg mb-4"></div>
            <div className="h-5 w-80 bg-gray-200/50 rounded-md"></div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
             <div className="h-9 w-28 bg-gray-200/60 rounded-full"></div>
             <div className="h-9 w-32 bg-gray-200/50 rounded-full"></div>
             <div className="h-9 w-36 bg-gray-200/50 rounded-full"></div>
          </div>
        </div>

        {/* Featured Latest Video Skeleton */}
        <div className="mb-16">
          <div className="relative aspect-video w-full rounded-3xl bg-gray-200/60 overflow-hidden shadow-xl"></div>
        </div>

        {/* Video Grid Skeleton */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col">
              <div className="relative aspect-video rounded-2xl mb-4 bg-gray-200/60 shadow-md"></div>
              <div className="px-1">
                <div className="h-3 w-24 bg-gray-200/50 rounded inline-block mb-3"></div>
                <div className="h-5 w-full bg-gray-200/60 rounded mb-2"></div>
                <div className="h-5 w-4/5 bg-gray-200/60 rounded mb-3"></div>
                <div className="h-3 w-1/3 bg-gray-200/50 rounded"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
