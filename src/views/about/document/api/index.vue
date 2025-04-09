<template>
  <GiIframe :src="`${apiBaseUrl}/doc.html`"></GiIframe>
</template>

<script lang='ts' setup>
defineOptions({ name: 'AboutDocumentApi' })

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
</script>

<style scoped lang="scss"></style>
