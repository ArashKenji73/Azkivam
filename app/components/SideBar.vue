<template>
    <div class="sidebar flex flex-col md:w-1/4 shrink-0 bg-white p-4 border rounded-2xl">
        <h1 class="mb-8 text-xl">فیلترها</h1>
        <category-list :items="categories.data"/>
        <hr>
        <merchant-filter />
    </div>

</template>

<script setup>
import { useCategories } from '~/composable/useCategories';
const { data: categories } = await useCategories()
</script>

<style lang="scss" scoped>

</style>