<template>
  <div class="merchant-box">
    <h3 class="my-6 text-xl">فروشگاه‌ها</h3>
    <input
      type="text"
      v-model="search"
      placeholder="جستجوی فروشگاه"
      class="search-box"
    />

    <div v-for="m in filteredMerchants" :key="m.id" class="merchant-item">
      <div class="flex items-center mb-4">
        <input :id="m.id" type="checkbox" :value="m.id" v-model="selected"
            @change="updateQuery"
            class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft">
        <label for="default-checkbox" class="select-none ms-2 text-sm font-medium text-heading">{{ m.name }}</label>
      </div>  
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue"
import { useMerchants } from "~/composable/useMerchants"
const route = useRoute()
const router = useRouter()

// Fetch merchants (SSR)
const { data: merchants } = await useMerchants()

// Local states
const search = ref("")

// Load selected merchants from query string
const selected = ref([])

// Filter by search
const filteredMerchants = computed(() => {
  if (!merchants.value) return []
  return merchants.value.data.filter(m =>
    m.name.includes(search.value.trim())
  )
})

// Update query ?merchants=1,2,3
function updateQuery() {
  router.push({
    query: {
      ...route.query,
      merchants: selected.value.join(",")
    }
  })
}


watch(
  () => route.query.merchants,
  (val) => {
    if (!val) {
      selected.value = []
      return
    }
    selected.value = val.split(",").map(Number)
  },
  { immediate: true }   // 🔥 load from query on first render
)
</script>

<style scoped>

.search-box {
  width: 100%;
  margin-bottom: 12px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
.merchant-item {
  margin: 6px 0;
  display: flex;
  align-items: center;
}
</style>
