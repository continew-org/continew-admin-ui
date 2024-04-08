import mitt from 'mitt'

type Events = {
  // 自定义事件名称
  event: void
  // 任意传递的参数
  [parmas: string]: any
}

const mittBus = mitt<Events>()
export default mittBus
