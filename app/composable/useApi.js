export const useApi = (path) => {
  const config = useRuntimeConfig()
  return $fetch(config.public.baseURL + path)
}
