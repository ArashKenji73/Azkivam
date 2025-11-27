<template>
  <div class="mt-6 text-center">
    
    <!-- Load More button -->
    <button
      v-if="hasMore"
      :disabled="loading"
      class="px-6 py-3 bg-black text-white rounded hover:bg-gray-700 disabled:opacity-50"
    >
      {{ loading ? loadingText : buttonText }}
    </button>

    <!-- No more products -->
    <p v-else class="text-gray-500 mt-4">
      {{ emptyText }}
    </p>

  </div>
</template>

<script setup>
const props = defineProps({
  loading: { type: Boolean, default: false },
  productsCount: { type: Number, required: true },
  totalItems:   { type: Number, required: true },
  buttonText:   { type: String, default: "مشاهده بیشتر" },
  loadingText:  { type: String, default: "در حال بارگزاری" },
  emptyText:    { type: String, default: "محصولی برای مشاهده نیست" },
})



const hasMore = computed(() => props.productsCount < props.totalItems)


</script>
