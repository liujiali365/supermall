<template>
      <swiper>
      <!-- 只v-for会报错，故各绑定一个key -->
      <swiper-item v-for="(item,index) in banners" :key="index">
        <!-- 在html标签里面用变量都需要绑定，而不是双大括号 -->
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: 'HomeSwipers',
  components: {
    SwiperItem,
    Swiper
  },
  props: {
    banners: Array,
    default() {       // 默认值是对象或者数组时，默认值必须是函数
      return []
    }
  }
}
</script>

<style>

</style>