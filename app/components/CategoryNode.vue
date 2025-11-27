<template>
  <div class="node py-4 mr-2">

    <!-- IF HAS CHILDREN → expandable div -->
    <div
      v-if="hasChildren"
      class="node-header flex items-center gap-2 mb-4 cursor-pointer"
      @click="emit('toggle', category.id)"
    >
      <span class="text-sm">{{ category.name }}</span>

      <Icon
        name="heroicons:chevron-down"
        :class="{ open: props.openMap[category.id] }"
        class="w-6 h-6 arrow"
      />
    </div>

    <!-- IF NO CHILDREN → NuxtLink -->
    <NuxtLink
      v-else
      class="node-header"
      :to="`/products/${category.id}/${category.slug}`"
    >
      <span class="text-sm">{{ category.name }}</span>
    </NuxtLink>

    <!-- Children -->
    <transition name="fade">
      <div
        v-if="props.openMap[category.id]"
        class="children text-gray-700 font-light"
      >
        <CategoryNode
          v-for="child in getChildren(category.id)"
          :key="child.id"
          :category="child"
          :get-children="getChildren"
          :open-map="props.openMap"
          @toggle="$emit('toggle', $event)"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps({
  category: Object,
  getChildren: Function,
  openMap: Object,
})

const emit = defineEmits(['toggle'])

const hasChildren = computed(() => {
  return props.getChildren(props.category.id).length > 0
})
</script>
<style lang="css">
.node.py-4:last-child{
  padding-bottom: 0px;
}
</style>
