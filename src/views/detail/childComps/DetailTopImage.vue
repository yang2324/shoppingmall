<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="" @load="loadImgMore">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'

export default {
  name: "DetailToImage",
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    //监听图片加载
    // loadImgMore() {
    //   this.$bus.$emit("topImages")
    // },
    loadImgMore() {
      if (!this.isLoad) {
        this.$emit("topImages")
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
