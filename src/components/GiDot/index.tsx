import { defineComponent, type PropType } from 'vue'
import './dot.scss'

type TPropsType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export default defineComponent({
  name: 'GiDot',
  props: {
    animation: {
      type: Boolean,
      default: true
    },
    type: {
      type: String as PropType<TPropsType>,
      default: 'primary'
    }
  },
  setup(props) {
    return () => <span class={['gi-dot', { 'gi-dot-processing': props.animation }, `gi-dot-${props.type}`]}></span>
  }
})
