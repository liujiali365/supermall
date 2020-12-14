<template>
  <div class="recommand">
    <div v-for="(item,index) in recommands" :key="index" class="recommand-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommandView",
  props: {
    recommands: Array,
    default() {
      return []
    }
  }
}
</script>

<style>
  .recommand {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eeeeee ;
  }
  .recommand-item {
    flex: 1;
  }
  .recommand-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>