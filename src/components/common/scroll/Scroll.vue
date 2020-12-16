<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // document.querySelector('.wrapper') 这样获取可能会在被使用时有其他的组件也用，则获取到第一个wrapper，不一定会是哪个
    // vue中明确拿到某一个元素： ref属性，明确拿到某一个子组件 父组件this.$refs.ref的值($refs拿到对象，$children拿到的是数组)
    // 1. 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 这个属性设置为true时，div，span等元素也是可监听点击的
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    // 2. 监听滚动的位置
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll', position)
    })

    // 3. 监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>