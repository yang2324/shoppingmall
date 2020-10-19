<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  text-align: center;
  padding: 10px 0 20px 0;
  border-bottom: 8px solid #eee
}

.recommend-item {
  flex: 1;
  font-size: 14px
}

.recommend-item img {
  width: 80px;
  height: 80px;
  vertical-align: middle;
  margin-bottom: 10px;
}
</style>
