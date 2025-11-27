<template>
  <div>
    <h1 class="mb-4 text-2xl">{{ humanSlug }}</h1>
    <div class="grid grid-cols-4">
      <!-- SSR skeleton -->
      <div v-if="loading" v-for="i in 12" :key="i" class="h-60 bg-gray-200 animate-pulse rounded"></div>
      <!-- Product list -->
      <template v-else>
        <template v-for="product in productsByCategory">
          <single-product :data="product" />
        </template>
      </template>
    </div>


    <!-- Load more -->
    <div v-if="productsByCategory" class="mt-6 text-center">
      <button v-if="productsByCategory.length < totalItems" @click="fetchProductByCategory(categoryId)"
        class="px-6 py-3 bg-black text-white rounded hover:bg-gray-700" :disabled="loading">
        {{ loading ? 'Loading…' : 'Show More' }}
      </button>
      <!-- <p v-else class="text-gray-500 mt-4">No more products</p> -->
    </div>
  </div>
</template>
<script setup>
import { useProducts } from '~/composable/useProducts'
definePageMeta({
  layout: 'default'
})


const route = useRoute()
const categoryId = route.params.categoryId
const slug = route.params.slug

const humanSlug = computed(() => {
  return slug?.replace(/-/g, " ") || ""
})
const { fetchProductByCategory, productsByCategory,loading, totalItems } = useProducts();
fetchProductByCategory(categoryId)



watch(
  () => route.query.merchants,
  (newVal, oldVal) => {
    fetchProductByCategory(categoryId, true)
  },
)
</script>