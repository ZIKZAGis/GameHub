import { ICustomSuspense } from "@/types/suspense";
import { Suspense } from "react";

export default function CustomSuspense({loading, error, skeleton, children} : ICustomSuspense) {
  return (
    <Suspense fallback={
      <>
        {loading && skeleton}
        {error && 'error'}
      </> 
    }>
      {children}
    </Suspense>
  );
}