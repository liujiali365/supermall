<template>
  <div class="goods">
    <goods-item v-for="(item,index) in goods" :key="index" :goodsItem="item"/> 
  </div>
</template>

<script>
import GoodsItem from './GoodsItem'

export default {
  name: "GoodsList",
  components: {
    GoodsItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods {
    /* 默认子元素全部往一行里面塞 */
    display: flex;
    /* flex-wrap默认情况下不包裹，所有数据往一行里塞。wrap包裹则根据子的宽度塞 */
    flex-wrap: wrap;
    /* 空白的地方均等分 */
    /* justify-content: space-around; */
    justify-content: space-evenly;
  }
  
</style>