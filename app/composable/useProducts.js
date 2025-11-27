import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

export function useProducts() {
  const config = useRuntimeConfig()
  const route = useRoute()
  
  const products = ref([]) // ✅ start as array
  const loading = ref(false)
  const error = ref(null)
  const page = ref(1)
  const size = ref(12)
  const totalItems = ref()


  const merchantIds = computed(() => {
    if (!route.query.merchants) return []
    return route.query.merchants
      .split(',')
      .map(Number)
      .filter(Boolean)
  })

  async function fetchProducts(reset = false) {
    loading.value = true
    error.value = null


    if(reset === true){
      page.value = 1
      products.value = []
    }

    try {
      loading.value = true
      const data = await $fetch(
        `${config.public.baseURL}/products?size=${size.value}&page=${page.value}`,
        {
          method: 'POST',
          body: { merchants: merchantIds.value },
        }
      )
      products.value = [...products.value, ...data.data];
      totalItems.value = data.totalItems
      page.value++
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }


    // ===== NEW: FETCH PRODUCT BY ID ======
  const productsByCategory = ref([])

  async function fetchProductByCategory(categoryID, reset = false) {
    loading.value = true
    error.value = null

    if(reset === true){
      page.value = 1
      productsByCategory.value = []
    }

    try {
      const data = await $fetch(
      `${config.public.baseURL}/products/${categoryID}?size=${size.value}&page=${page.value}`,
        {
          method: 'POST',
          body: { merchants: merchantIds.value },
        }
      )
      productsByCategory.value = [...productsByCategory.value, ...data.data];
      totalItems.value = data.totalItems
      page.value++
    } catch (err) {
      error.value = err
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    page,
    totalItems,
    productsByCategory,
    fetchProducts,
    fetchProductByCategory,
  }
}
