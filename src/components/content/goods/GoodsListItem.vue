<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" @load="loadImgMore">
    <div class="info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods:{
    //监听图片加载
    loadImgMore(){
      this.$bus.$emit("itemLoadImg")
    }
  }
}
</script>

<style scoped>
.goods-item {
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 6px;
}

.info p {
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
}

.info {
  text-align: center;
  padding: 3px 0;
}

.info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.info .collect{
  position: relative;
}
.info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}

</style>
