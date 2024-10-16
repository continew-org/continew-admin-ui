<template>
  <a-form ref="formRef" :auto-label-width="true" v-bind="options.form" :model="modelValue">
    <a-row :gutter="14" v-bind="options.row" class="w-full">
      <template v-for="(item, index) in columns" :key="item.field">
        <a-col v-if="!isHide(item.hide)" v-show="colVShow(index)" :span="item.span || 12"
               v-bind="item.col || item.span ? item.col : options.col">
          <a-form-item v-bind="item.item" :label="item.label" :field="item.field" :rules="item.rules"
                       :disabled="isDisabled(item.disabled)">
            <slot v-if="!['group-title'].includes(item.type || '')" :name="item.field"
                  v-bind="{ disabled: isDisabled(item.disabled) }">
              <template v-if="item.type === 'range-picker'">
                <DateRangePicker v-bind="(item.props as A.RangePickerInstance['$props'])"
                                 :model-value="modelValue[item.field as keyof typeof modelValue]"
                                 @update:model-value="valueChange($event, item.field)" />
              </template>
              <component v-else :is="`a-${item.type}`" v-bind="getComponentBindProps(item)"
                         :model-value="modelValue[item.field as keyof typeof modelValue]"
                         @update:model-value="valueChange($event, item.field)"></component>
            </slot>
            <slot v-else name="group-title">
              <a-alert v-bind="item.props">{{ item.label }}</a-alert>
            </slot>
          </a-form-item>
        </a-col>
      </template>
      <a-col v-if="!options.btns?.hide" :span="options.btns?.span || 12" v-bind="options.btns?.col">
        <a-space wrap>
          <slot name="suffix">
            <a-button type="primary" @click="emit('search')">
              <template #icon><icon-search /></template>
              <template #default>{{ options.btns?.searchBtnText || '查询' }}</template>
            </a-button>
            <a-button @click="emit('reset')">
              <template #icon><icon-refresh /></template>
              <template #default>重置</template>
            </a-button>
            <a-button v-if="options.fold?.enable" type="text" size="mini" @click="collapsed = !collapsed">
              <template #icon>
                <icon-up v-if="!collapsed" />
                <icon-down v-else />
              </template>
              <template #default>{{ collapsed ? '展开' : '收起' }}</template>
            </a-button>
          </slot>
        </a-space>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import type { Columns, ColumnsItem, ColumnsItemDisabled, ColumnsItemHide, Options } from './type'
import DateRangePicker from '@/components/DateRangePicker/index.vue'

interface Props {
  modelValue: any
  options: Options
  columns: Columns
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'search'): void
  (e: 'reset'): void
}>()

const formRef = ref('formRef')
const collapsed = ref(props.options.fold?.defaultCollapsed ?? false)
const dicData: Record<string, any> = reactive({})

// col组件的显示隐藏
const colVShow = (index: number) => {
  return index <= (props.options.fold?.index || 0) || (index >= (props.options.fold?.index || 0) && !collapsed.value)
}

// 组件的默认props配置
const getComponentBindProps = (item: ColumnsItem) => {
  const obj: Partial<ColumnsItem['props'] & { placeholder: string }> = {}
  if (item.type === 'input') {
    obj.placeholder = `请输入${item.label}`
  }
  if (item.type === 'input-password') {
    obj.placeholder = `请输入${item.label}`
  }
  if (item.type === 'input-number') {
    obj.placeholder = `请输入${item.label}`
  }
  if (item.type === 'textarea') {
    obj.placeholder = `请输入${item.label}`
    obj.maxLength = 200
  }
  if (item.type === 'select') {
    obj.placeholder = `请选择${item.label}`
    obj.options = dicData[item.field] || item.options
  }
  if (item.type === 'cascader') {
    obj.placeholder = `请选择${item.label}`
    obj.options = dicData[item.field] || item.options
  }
  if (item.type === 'tree-select') {
    obj.placeholder = `请选择${item.label}`
    obj.data = dicData[item.field] || item.data
  }
  if (item.type === 'radio-group') {
    obj.options = dicData[item.field] || item.options
  }
  if (item.type === 'checkbox-group') {
    obj.options = dicData[item.field] || item.options
  }
  if (item.type === 'date-picker') {
    obj.placeholder = '请选择日期'
  }
  if (item.type === 'time-picker') {
    obj.allowClear = true
    obj.placeholder = `请选择时间`
  }
  return { ...obj, ...item.props }
}

const valueChange = (value: any, field: string) => {
  emit('update:modelValue', Object.assign(props.modelValue, { [field]: value }))
}

const isHide = (hide?: ColumnsItemHide<boolean | object>) => {
  if (hide === undefined) return false
  if (typeof hide === 'boolean') return hide
  if (typeof hide === 'function') {
    return hide(props.modelValue)
  }
}

const isDisabled = (disabled?: ColumnsItemDisabled<boolean | object>) => {
  if (disabled === undefined) return false
  if (typeof disabled === 'boolean') return disabled
  if (typeof disabled === 'function') {
    return disabled(props.modelValue)
  }
}

defineExpose({ formRef })

props.columns.forEach((item) => {
  if (item.request && typeof item.request === 'function' && item?.init) {
    item.request(props.modelValue).then((res) => {
      dicData[item.field] = item.resultFormat ? item.resultFormat(res) : res.data
    })
  }
})

// 先找出有级联的项
// 如果这个字段改变了值，那么就找出它的cascader属性对应的字段项，去请求里面的request
const hasCascaderColumns: ColumnsItem[] = []
props.columns.forEach((item) => {
  const arr = hasCascaderColumns.map((i) => i.field)
  if (item.cascader?.length && !arr.includes(item.field)) {
    hasCascaderColumns.push(item)
  }
})

// 要深克隆，否则无法监听新旧值变化
const cloneForm = computed(() => cloneDeep(props.modelValue))

watch(cloneForm as any, (newVal, oldVal) => {
  hasCascaderColumns.forEach((item) => {
    if (newVal[item.field] !== oldVal[item.field]) {
      const arr = props.columns.filter((a) => {
        return item?.cascader?.includes(a.field)
      })
      arr.forEach((i) => {
        if (i.request && Boolean(newVal[item.field])) {
          i.request(props.modelValue).then((res) => {
            dicData[i.field] = i.resultFormat ? i.resultFormat(res) : res.data
            if (!dicData[i.field].map((i: any) => i.value).includes(props.modelValue[i.field])) {
              emit('update:modelValue', Object.assign(props.modelValue, { [i.field]: '' }))
            }
          })
        } else if (i.request && !newVal[item.field]) {
          dicData[i.field] = []
          emit('update:modelValue', Object.assign(props.modelValue, { [i.field]: '' }))
        }
      })
    }
  })
})
</script>

<style lang="scss" scoped>
:deep(.arco-form-item-layout-inline) {
  margin-right: 0;
}
</style>
