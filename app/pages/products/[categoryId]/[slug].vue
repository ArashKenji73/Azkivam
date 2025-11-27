<template>
  <div>
    <h1 class="mb-4 text-2xl">{{ humanSlug }}</h1>
    <grid-wrapper>
      <!-- SSR skeleton -->
      <div v-if="loading" v-for="i in 12" :key="i">
        <skeleton-card/>
      </div>
      <!-- Product list -->
      <template v-else>
        <template v-for="product in productsByCategory">
          <single-product :data="product" />
        </template>
      </template>
   
    </grid-wrapper>



    <!-- Load more -->
    <LoadMore
      :loading="loading"
      :products-count="productsByCategory.length"
      :total-items="totalItems"
      @click="fetchProductByCategory(categoryId)"
    />
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