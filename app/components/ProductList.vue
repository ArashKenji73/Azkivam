<template>
  <grid-wrapper>
    <!-- SSR skeleton -->
    <div v-if="loading" v-for="i in 12" :key="i">
      <skeleton-card/>
    </div>

    <!-- Product list -->
    <template v-else>
      <template v-for="product in products">
        <single-product :data="product" />
      </template>
    </template>
  </grid-wrapper>


  <!-- Load more -->
<LoadMore
  :loading="loading"
  :products-count="products.length"
  :total-items="totalItems"
  @click="fetchProducts"
/>
</template>

<script setup>
const route = useRoute()
import { useProducts } from '~/composable/useProducts';
const { products, fetchProducts, loading, totalItems } = useProducts()


watch(
  () => route.query.merchants,
  (newVal, oldVal) => {
    fetchProducts(true)
  }, { immediate: true }
)
</script>
