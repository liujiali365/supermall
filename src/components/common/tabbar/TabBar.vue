<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'TabBar'
}
</script>

<style>


  #tab-bar {
    /* 其中的内容水平分布 */
    display: flex;   
    background-color: #f6f6f6;

    /* 左右都写0，保证占据整个平面 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /* 阴影 x,y偏移量(x为正向右，y为正向下)，模糊程度，阴影颜色 */
    box-shadow: 0 -2px 5px rgba(100, 100, 100, .1);
  }



</style>