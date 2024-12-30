import { MoimCardSkeleton } from "./MoimCardSkeleton";

export function MoimGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <MoimCardSkeleton key={i} />
      ))}
    </div>
  );
}
