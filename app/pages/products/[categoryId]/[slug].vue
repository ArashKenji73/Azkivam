<script setup>
const route = useRoute()

const categoryId = route.params.categoryId
const slug = route.params.slug
</script>

<template>
  <div>
    <h1>Category: {{ categoryId }}</h1>
    <p>Slug: {{ slug }}</p>
  </div>
</template>
