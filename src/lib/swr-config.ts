import { SWRConfiguration } from 'swr'
import { fetchData } from '@/lib/typedFetch'

export const fetcher = (url: string) => fetchData(url)

export const swrConfig: SWRConfiguration = {
  fetcher,
  suspense: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 5000,
  errorRetryCount: 3,
  errorRetryInterval: 1000,
}