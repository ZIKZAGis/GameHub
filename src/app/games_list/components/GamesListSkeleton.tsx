export default function GamesListSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-72 h-96 bg-[#08040d] rounded-xl p-4 animate-pulse flex flex-col">
                        <div className="w-full h-48 bg-gray-600 rounded mb-4 flex-shrink-0"></div>
                        <div className="flex flex-col gap-3 flex-1">
                            <div className="h-5 bg-gray-600 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-600 rounded w-2/3"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center mt-12 gap-4">
                <div className="w-20 h-10 bg-gray-600 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-600 rounded animate-pulse"></div>
                <div className="w-20 h-10 bg-gray-600 rounded animate-pulse"></div>
            </div>
        </div>
    )
}