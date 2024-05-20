export function resetSize(vm) {
  let img_width
  let img_height
  let bar_width
  let bar_height // 图片的宽度、高度，移动条的宽度、高度

  const parentWidth = vm.$el.parentNode.offsetWidth || window.innerWidth
  const parentHeight = vm.$el.parentNode.offsetHeight || window.innerHeight
  if (vm.imgSize.width.includes('%')) {
    img_width = `${(Number.parseInt(vm.imgSize.width, 10) / 100) * parentWidth}px`
  } else {
    img_width = vm.imgSize.width
  }

  if (vm.imgSize.height.includes('%')) {
    img_height = `${(Number.parseInt(vm.imgSize.height, 10) / 100) * parentHeight}px`
  } else {
    img_height = vm.imgSize.height
  }

  if (vm.barSize.width.includes('%')) {
    bar_width = `${(Number.parseInt(vm.barSize.width, 10) / 100) * parentWidth}px`
  } else {
    bar_width = vm.barSize.width
  }

  if (vm.barSize.height.includes('%')) {
    bar_height = `${(Number.parseInt(vm.barSize.height, 10) / 100) * parentHeight}px`
  } else {
    bar_height = vm.barSize.height
  }

  return {
    imgWidth: img_width,
    imgHeight: img_height,
    barWidth: bar_width,
    barHeight: bar_height
  }
}
