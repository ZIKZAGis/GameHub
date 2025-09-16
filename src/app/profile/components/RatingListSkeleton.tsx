import Skeleton from "@/components/ui/Skeleton";

export default function RatingListSkeleton() {
  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="w-full aspect-video rounded-lg" />
        ))}
      </div>
    </section>
  );
}
