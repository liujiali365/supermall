<template>
  <h2>详情页{{iid}}</h2>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      iid: null
    }
  },
  created() {
    this.iid = this.$route.params.id
  }
}
</script>

<style scoped>

</style>

