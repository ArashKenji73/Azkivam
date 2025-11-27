import { useApi } from "./useApi";

export function useMerchants() {
  return useAsyncData('merchants', () =>
    useApi('/merchants')
  )
}
