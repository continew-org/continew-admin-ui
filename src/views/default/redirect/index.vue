<template>
  <div></div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const { params, query } = route
const { path } = params

router.replace({ path: '/' + path, query })
</script>
