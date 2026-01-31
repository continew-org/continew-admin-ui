<template>
  <div class="ocr-result-panel">
    <a-card title="OCR 结果" :bordered="false">
      <a-empty description="占位预留，后续展示识别结果" />
    </a-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'OcrResultPanel' })
</script>

<style scoped lang="scss">
.ocr-result-panel {
  height: 100%;
  overflow: auto;

  :deep(.arco-card) {
    height: 100%;
    .arco-card-body {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 200px;
    }
  }
}
</style>
