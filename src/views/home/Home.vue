<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swipers :banners="banners"/>
    <home-recommand-view :recommands="recommands"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwipers from './childComps/HomeSwipers'
import HomeRecommandView from './childComps/HomeRecommandView'
import {getHomeMultidata} from "network/home"
// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwipers,
    HomeRecommandView
  },
  data() {
    return {
      banners: [],
      recommands: []
    }
  },
  created() {
    // 1. 请求多个数据
    getHomeMultidata().then(res => {
      console.log(res);
      // 箭头函数中的this向外找作用域，create的this即当前组件对象的this
      this.banners = res.data.data.banner.list;
      this.recommands = res.data.data.recommend.list;
    })
    // console.log(this.result); 这样无法验证是否保存了数据，因为上面函数是个异步操作
  }
}
</script>

<style>
  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>