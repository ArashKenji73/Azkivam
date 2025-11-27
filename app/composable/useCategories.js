import { useApi } from "./useApi";

export function useCategories() {
  return useAsyncData('categories', () =>
    useApi('/categories')
  )
}
