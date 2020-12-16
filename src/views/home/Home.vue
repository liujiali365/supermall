<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- probe-type不绑定也可以传给子，但传的是字符串！！！只要不加:,统一认为字符串！！！ -->
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swipers :banners="banners"/>
      <home-recommand-view :recommands="recommands"/>
      <feature-view></feature-view>
      <tab-control class="tab-control" 
              :titles="['流行','新款','精选']"
              @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!-- 监听组件的点击(原生事件)必须要加native -->
    <!-- <back-top @click="backClick"></back-top> -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- ul>li{列表$}*100 -->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwipers from './childComps/HomeSwipers'
import HomeRecommandView from './childComps/HomeRecommandView'
import FeatureView from './childComps/FeatureView'


import {getHomeMultidata, getHomeGoods} from "network/home"

// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwipers,
    HomeRecommandView,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommands: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1. 请求多个数据
    this.getHomeMultidata(),
    // console.log(this.result); 这样无法验证是否保存了数据，因为上面函数是个异步操作
    // 2. 请求商品数据
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      // console.log(index);
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick() {
      // 法1
      // this.$refs.scroll拿到Scroll组件对象
      // .scroll拿到组件中的scroll数据，是一个BScroll对象
      // .scrollTo是调用BScroll对象的scrollTo方法，500ms时间滚动到（x，y）位置
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)

      // 法2
      // 在Scroll组件内部重新封装了一下scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      this.isShowBackTop = -(position.y) > 1000
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        // 箭头函数中的this向外找作用域，create的this即当前组件对象的this
        this.banners = res.data.data.banner.list;
        this.recommands = res.data.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
      // console.log(res);
      // ...arr:把数组解构，传多个参数。如果直接传整个数组，相当于是把一个元素传到数组中
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    },
  }
}
</script>

<style scoped>
/* scoped代表这里的样式只针对当前组件起效果。否则会全局有效 */
  #home {
    /* fixed的元素脱离了标准流，为了不使覆盖，增加内上边距 */
    padding-top: 44px;
    /* vh即视口，100vh相当于100%视口高.移动端中为布局视口 */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    /* 原生时：这个属性代表没达到44px时为sticky，达到了为fixed属性，移动端一般就支持这个。 */
    position: sticky;
    top: 44px;
  }
  .content {
    /* 使用定位或者calc实现中间内容区域的动态确定高度 */
    height: calc(100% - 49px);
    overflow: hidden;
    /* 绝对定位使脱离标准流 */
    /* position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0; */
  }
</style>