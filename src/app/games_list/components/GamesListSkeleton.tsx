export default function GamesListSkeleton() {
    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="border rounded-lg p-4 animate-pulse">
                        <div className="bg-gray-200 h-50 w-110"></div>
                        <div className="bg-gray-200 h-20 w-3/4 mt-2"></div>
                        <div className="bg-gray-200 h-10 w-1/2 mt-2"></div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8 gap-2">
                <div className="bg-gray-200 h-10 w-1/3 mt-2"></div>
                <span className="bg-gray-200 h-10 w-1/3 mt-2"></span>
                <div className="bg-gray-200 h-10 w-1/3 mt-2"></div>
            </div>
        </div>

    )
}