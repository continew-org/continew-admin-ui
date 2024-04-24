<template>
  <a-button size="mini" class="gi_hover_btn" @click="handleToggleTheme">
    <template #icon>
      <icon-moon-fill v-if="appStore.theme === 'light'" :size="18" />
      <icon-sun-fill v-else :size="18" />
    </template>
  </a-button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useAppStore } from '@/stores'

defineOptions({ name: 'GiThemeBtn' })
const appStore = useAppStore()

const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark: boolean) {
    appStore.toggleTheme(dark)
  }
})

const toggleTheme = useToggle(isDark)

const handleToggleTheme = () => {
  toggleTheme()
}
</script>
