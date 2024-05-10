<template>
  <a-overflow-list v-if="data.length">
    <a-tag v-for="(item, index) in data" :key="index" size="small">
      {{ item }}
    </a-tag>
    <template #overflow="{ number }">
      <a-popover :content-style="{ maxWidth: '300px', padding: '8px 12px' }">
        <a-tag color="arcoblue" size="small">+{{ number }}</a-tag>
        <template #content>
          <a-space wrap>
            <a-tag v-for="tag in data.filter((i, n) => n >= data.length - number)" :key="tag" size="small">
              {{ tag }}
            </a-tag>
          </a-space>
        </template>
      </a-popover>
    </template>
  </a-overflow-list>
</template>

<script lang="ts" setup>
defineOptions({ name: 'GiOverFlowTags' })

withDefaults(defineProps<Props>(), {
  data: () => []
})
interface Props {
  data: string[]
}
</script>

<style lang="scss" scoped></style>
