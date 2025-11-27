<template>
  <div class="category-tree">
    <h1 class="mb-4 text-xl">دسته بندی ها</h1>
    <!-- ROOT CATEGORIES -->
    <CategoryNode
      v-for="cat in getChildren(null)"
      :key="cat.id"
      :category="cat"
      :get-children="getChildren"
      :open-map="openMap"
      @toggle="toggle"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

// Group by parent ID
const grouped = computed(() => {
  const map = {}
  props.items.forEach(cat => {
    if (!map[cat.parent]) map[cat.parent] = []
    map[cat.parent].push(cat)
  })
  return map
})

// Track opened parents
const openMap = ref({})

function toggle(id) {
  openMap.value[id] = !openMap.value[id]
}

// Recursive children getter
function getChildren(parentId) {
  return grouped.value[parentId] || []
}
</script>



<style scoped>
.category-tree {
  direction: rtl;
  font-family: sans-serif;
}
</style>
