<template>
  <a-modal :visible="visible" width="600">
    <CrontabGenerator />
  </a-modal>
</template>

<script setup lang="ts">
// const props = defineProps<CrontabType>()
const visible = ref<boolean>(true)
// interface CrontabType {
//   visible: boolean
//
// }
</script>

<style scoped lang="scss">

</style>
