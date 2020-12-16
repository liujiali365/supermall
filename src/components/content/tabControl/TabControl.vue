<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index" class="tab-control-item" 
              :class="{active: index === currentIndex}"
              @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
    <!-- 如果只是文字不一样就不必搞插槽 -->
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // 子传父，自定义事件
      this.$emit('tabClick', index);
    }
  },
  props: {
    titles:{
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  z-index: 9;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-high-text);
}
</style>