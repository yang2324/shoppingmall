<template>
  <div class="goods-list-box">
    <p class="recommend" v-show="isRecommend">推荐商品</p>
    <div class="goods-list">
      <goods-list-item class="goods-item" v-for="item in goods" :goodsItem="item"/>
    </div>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    },
    isRecommend: {
      type: Boolean,
      default() {
        return false;
      }
    },
    goodsHeight: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.goods-list-box .recommend {
  font-size: 15px;
  margin-top: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
}
</style>
