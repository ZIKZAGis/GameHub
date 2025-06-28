export interface ICustomSuspense {
    loading: boolean, 
    error: string | null, 
    skeleton: React.ReactNode,
    children: React.ReactNode, 
}