<template>
  <div class="sub-category">
      <div class="sub-item" v-for="item in subcategoryList">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: "SubCategory",
  props: {
    subcategoryList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.sub-category {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}

.sub-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 80px;
  height: 100px;
  margin-bottom: 10px;
}

.sub-item img {
  width: 65px;
  margin-bottom: 7px;
}

.sub-item p {
  font-size: 14px;
}
</style>
