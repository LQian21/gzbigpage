<template>
  <div class="page-container-box" :class="[isfix ? 'isfix' : '']" ref="pagebox">
    <img src="../assets/page_back_hd.jpg" class="bk" />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue'
interface BoxConfigProps {
  width: number
  height: number
  isfix?: boolean
}
export default defineComponent({
  name: 'pageContainerBox',
  props: {
    config: {
      required: true,
      type: Object as PropType<BoxConfigProps>
    }
  },
  setup(props, context) {
    const pagebox = ref<null | HTMLInputElement>(null)
    const isfix = ref<boolean>(props.config.isfix)
    let pageWidth: number
    let pageHeight: number
    const initPage: () => void = () => {
      if (props.config.width && props.config.height) {
        pageWidth = props.config.width
        pageHeight = props.config.height
      } else {
        pageWidth = window.screen.width
        pageHeight = window.screen.height
      }
      pagebox.value && (pagebox.value.style.width = `${pageWidth}px`)
      pagebox.value && (pagebox.value.style.height = `${pageHeight}px`)
    }
    const setScale: () => void = () => {
      const currentWidth = document.body.clientWidth
      const currentHeight = document.body.clientHeight
      const wScale = currentWidth / pageWidth
      const hScale = currentHeight / pageHeight
      !props.config.isfix && pagebox.value && (pagebox.value.style.transform = `scale(${wScale}, ${hScale})`)
    }
    const updatePage: () => void = () => {
      window.addEventListener('resize', setScale)
    }
    onMounted(() => {
      initPage()
      setScale()
      updatePage()
    })
    onUnmounted(() => {
      window.removeEventListener('resize', setScale)
    })
    return {
      isfix,
      pagebox,
      initPage,
      setScale
    }
  }
})
</script>
<style lang="scss" scoped>
.page-container-box {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
  //   background-image: linear-gradient(90deg, rgba(125, 186, 243, 0.075) 2px, transparent 0), linear-gradient(rgba(121, 183, 241, 0.075) 2px, transparent 0);
  //   background-size: 35px 35px;
  &.isfix {
    position: relative;
    // background-image: linear-gradient(90deg, #0e2251 0%, #1b437b 25%, #2e6ca7 50%, #1b437b 75%, #0e2251 100%);
    // background-size: unset;
  }
}
</style>
