<template>
  <ErrorPage :code="500" />
</template>

<script setup lang="ts">
import ErrorPage from './components/ErrorPage.vue'

defineOptions({ name: 'Error500' })
</script>

<style lang="scss" scoped></style>
