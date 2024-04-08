import { defineComponent, computed, type PropType } from 'vue'
import './tag.scss'

type TPropsType = 'dark' | 'light' | 'outline' | 'light-outline'
type TPropsStatus = 'primary' | 'success' | 'warning' | 'danger' | 'info'
type TPropsSize = 'mini' | 'small' | 'large'

export default defineComponent({
  name: 'GiTag',
  props: {
    type: {
      type: String as PropType<TPropsType>,
      default: 'light'
    },
    status: {
      type: String as PropType<TPropsStatus>,
      default: 'primary'
    },
    size: {
      type: String as PropType<TPropsSize>,
      default: 'small'
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click', 'close'],
  setup(props, { slots, emit }) {
    const className = computed(() => {
      const arr = ['gi-tag']
      if (props.type) {
        arr.push(`gi-tag-${props.type}`)
      }
      if (props.size) {
        arr.push(`gi-tag-size-${props.size}`)
      }
      if (props.status) {
        arr.push(`gi-tag-status-${props.status === 'info' ? 'gray' : props.status}`)
      }
      return arr
    })

    const handleClick = () => {
      emit('click')
    }

    const handleClose = (event: MouseEvent) => {
      event.stopPropagation()
      emit('close')
    }

    const CloseIcon = (
      <span class="gi-tag-close-btn" onClick={(e) => handleClose(e)}>
        <icon-close class="close-icon" />
      </span>
    )

    return () => (
      <span class={className.value} onClick={handleClick}>
        {slots.default?.()}
        {props.closable && CloseIcon}
      </span>
    )
  }
})
