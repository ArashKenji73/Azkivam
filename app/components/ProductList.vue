<template>
  <div>
    <div class="grid grid-cols-4">
      <!-- SSR skeleton -->
      <div v-if="loading" v-for="i in 8" :key="i" class="h-60 bg-gray-200 animate-pulse rounded"></div>

      <!-- Product list -->
      <template v-else>
        <template v-for="product in products">
          <single-product :data="product" />
        </template>
      </template>
    </div>

    <!-- Load more -->
    <div v-if="products" class="mt-6 text-center" >
      <button
        v-if="products.length < totalItems"
        @click="fetchProducts"
        class="px-6 py-3 bg-black text-white rounded hover:bg-gray-700"
        :disabled="loading"
      >
      
        {{ loading ? 'Loading…' : 'Show More' }}
      </button>

      <!-- <p v-else class="text-gray-500 mt-4">No more products</p> -->
    </div>



  </div>
</template>

<script setup>
import { useProducts } from '~/composable/useProducts';
const { products, fetchProducts, loading, totalItems } = useProducts()
</script>
