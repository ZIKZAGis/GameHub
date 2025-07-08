export interface ICustomSuspense {
    fallback: React.ReactNode;
    children: React.ReactNode;
    errorFallback?: React.ReactNode;
}