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
      probeType: this.probeType,    // 1，2，3代表监听滚动位置的不同 position
      pullUpLoad: this.pullUpLoad   // true/false监听是否拉到底部，在BScroll中要有这个配置，才能有实例的监听
    })

    // 2. 监听滚动的位置
    if(this.probeType === 2 || this.probeType ===3 ) {
      this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll', position)
      })
    }

    // 3. 监听上拉事件
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time) {
      // 防止还未渲染组件就要调用。与阻断
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(...args) {
      this.scroll && this.scroll.refresh()
      console.log(args);
    },
    getScrollY() {
      return this.scroll.y ? this.scroll.y : 0;
    }
  }
}
</script>

<style scoped>

</style>