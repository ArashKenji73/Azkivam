<template>
  <div class="flex flex-col border border-gray-300  px-4 py-8">
    <NuxtImg 
      :src="data.imageUrl" 
      class="product-image mb-4"
      width="400" 
      height="400" 
      placeholder="/images/no-image.svg"
    />

    <div class="mt-auto">
      <h1 class="product-title mb-6">{{ data.name }}</h1>
      <div class="text-sm mb-4">شروع قیمت از </div>
      <p>{{ data.minPrice.toLocaleString() }}
        تومان
      </p>
    </div>
  </div>
</template>

<script setup>
const {data} = defineProps(['data'])
const errorImage = (e) => {
  e.target.src = '/images/no-image.svg'
}
</script>

<style scoped>
.product-image{
  height: 340px;
  object-position: center;
  object-fit: cover;
}
.product-title{
  display: -webkit-box;
  -webkit-line-clamp: 2; /* show only 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>