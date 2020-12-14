<template>
  <!-- 所有item都展示同一个图片 -->
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!-- <div :class="{active: isActive}"><slot name="item-text"></slot></div>              插槽会被替换，如果在这里绑定变量，最后没有用。所以用一个div包裹,再使用变量。 -->
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,          // 父子通信，父使用该组件时用对应的名字当属性，传值即可
    activeColor: {
      type: String,
      default: 'pink'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {         // 计算属性，也当属性用。只是写成函数
    isActive() {
      // /home -> item2(/user)
      // /home -> item2(/home)   = true
      // /home -> item1(/profile)
      // indexOf: 从活跃路径字符串没有找到this.path字符串，则返回-1
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      // console.log('itemClick');
      this.$router.replace(this.path);
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    /* 对多个flex盒子均等分 */
    flex: 1;
    text-align: center;
    /* 移动端一般tab-bar是49px高 */
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    /* img是行内块级，文字是行内，汇编到一行 */
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /* 默认图片下面会多三个像素，通过vertical-align属性去掉。该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐 */
    vertical-align: middle;
  }

  /* .active {
    color: pink;
  } */
</style>