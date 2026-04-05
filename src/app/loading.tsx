export default function HomeLoadingSkeleton() {
  return (
    <main className="min-h-screen bg-brand-sand">
      {/* Navigation Skeleton */}
      <nav className="fixed top-0 inset-x-0 glass-panel border-b-0 m-4 p-4 flex justify-between items-center z-50 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-md bg-gray-200/60 shadow-sm"></div>
          <div className="h-6 w-24 bg-gray-200/50 rounded"></div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="h-4 w-16 bg-gray-200/50 rounded"></div>
          <div className="h-4 w-16 bg-gray-200/50 rounded"></div>
          <div className="h-4 w-16 bg-gray-200/50 rounded"></div>
          <div className="h-4 w-16 bg-gray-200/50 rounded"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-24 bg-gray-200/60 rounded-full"></div>
        </div>
      </nav>

      {/* Hero Section Skeleton */}
      <section className="relative pt-40 pb-24 px-6 sm:px-12 lg:px-24 overflow-hidden animate-pulse">
        <div className="max-w-4xl relative z-10">
          <div className="h-16 md:h-24 bg-gray-200/60 rounded-xl w-3/4 mb-4"></div>
          <div className="h-16 md:h-24 bg-gray-200/60 rounded-xl w-1/2 mb-8"></div>
          
          <div className="h-5 bg-gray-200/50 rounded w-full mb-3"></div>
          <div className="h-5 bg-gray-200/50 rounded w-5/6 mb-10"></div>
          
          <div className="flex flex-wrap gap-5">
            <div className="h-14 w-48 bg-gray-200/60 rounded-full"></div>
            <div className="h-14 w-56 bg-gray-200/60 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Forum Search Section Skeleton */}
      <section className="px-6 md:px-12 lg:px-24 pb-16 animate-pulse">
         <div className="h-16 md:h-20 w-full max-w-3xl bg-gray-200/60 rounded-2xl"></div>
      </section>

      {/* Widgets Skeleton */}
      <section className="px-6 md:px-12 lg:px-24 pb-20 animate-pulse">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Daily Feature Skeleton */}
          <div className="md:col-span-2 glass-panel p-8 rounded-2xl bg-gray-100/40">
            <div className="h-4 w-32 bg-gray-200/60 rounded mb-6"></div>
            <div className="h-8 w-3/4 bg-gray-200/60 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200/50 rounded"></div>
          </div>

          {/* Tools Grid Skeleton */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100/40 rounded-2xl p-6 h-36"></div>
            <div className="bg-gray-100/40 rounded-2xl p-6 h-36"></div>
          </div>

        </div>
      </section>
    </main>
  );
}
