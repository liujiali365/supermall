<template>
  <div class="nav-bar">
    <!-- slot不能直接布局,所以搞个div -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style>
  .nav-bar {
    /* 对大的使用flex布局 */
    display: flex;
    height: 44px;
    /* line-height可以直接把盒子撑起来，使其中的文字也居中。必须要有内容才能显示出来 */
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  }
  .left, .right {
    width: 60px;
  }
  .center {
    /* 只剩这一个了，占据flex父元素的剩下宽度 */
    flex: 1;
  }
</style>