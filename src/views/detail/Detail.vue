<template>
  <div id="detail">
    <!--顶部导航栏-->
    <detail-nav-bar class="detail-nav"/>

    <scroll class="content" ref="scroll" :probe-type="3">
      <!--顶部轮播图-->
      <detail-top-image :topImages="topImages"/>
      <!--商品信息-->
      <detail-base-info :goods="goods"/>
      <!--店铺-->
      <detail-shop-info :shop="shop"/>
      <!--图片详情-->
      <detail-goods-info :goodsInfo="goodsInfo" @imgLoad="imgLoad"/>
    </scroll>

  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailTopImage from "./childComps/DetailTopImage";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";

import {getDetail, Goods, Shop} from "network/detail";
import {debounce} from "common/utils"

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailTopImage,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      goodsInfo: {}
    }
  },
  created() {
    //1. 保存传入的 iid
    this.iid = this.$route.params.iid

    //2. 通过iid获取信息
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result
      //1. 获取轮播图数据
      this.topImages = data.itemInfo.topImages
      //2. 获取商品详情数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //3. 获取商店信息数据
      this.shop = new Shop(data.shopInfo)
      //4. 获取商品图片展示信息
      this.goodsInfo = data.detailInfo
    })
  },
  mounted() {
    //防抖动
    const refresh = debounce(this.$refs.scroll.refresh, 20)
    //接收图片加载完，事件监听 重新计算滑动高度
    this.$bus.$on("itemLoadImg", () => {
      refresh()
    })
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
  overflow: hidden;
  /*position: absolute;*/
  /*top: 44px;*/
  /*left: 0;*/
  /*right: 0;*/
  /*overflow: hidden;*/
}

/*.detail-nav {*/
/*  z-index: 9;*/
/*}*/
</style>
