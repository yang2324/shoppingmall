<template>
  <div id="detail">
    <!--顶部导航栏-->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>

    <scroll class="content" ref="scroll" :probe-type="3">
      <!--顶部轮播图-->
      <detail-top-image :topImages="topImages"/>
      <!--商品信息-->
      <detail-base-info :goods="goods"/>
      <!--店铺-->
      <detail-shop-info :shop="shop"/>
      <!--图片详情-->
      <detail-goods-info :goodsInfo="goodsInfo" @imgLoad="imgLoad"/>
      <!--商品参数-->
      <detail-goods-params :goods-params="goodsParams" ref="params"/>
      <!--用户评价-->
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <!--推荐-->
      <goods-list :goods="recommend" ref="recommend"/>
    </scroll>

  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailTopImage from "./childComps/DetailTopImage";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailGoodsParams from "./childComps/DetailGoodsParams";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import {getDetail, Goods, Shop, GoodsParams, getDetailRecommend} from "network/detail";
import {itemImgListener} from "common/mixin"
import {debounce} from "common/utils"

import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailTopImage,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailGoodsParams,
    DetailCommentInfo,
    GoodsList,
    Scroll
  },
  mixins: [itemImgListener],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      goodsInfo: {},
      goodsParams: {},
      commentInfo: {},
      recommend: [],
      themeTopY: [],
      getThemeTopY: null
    }
  },
  created() {
    //1. 保存传入的 iid
    this.iid = this.$route.params.iid
    //2. 通过iid获取信息
    getDetail(this.iid).then(res => {
      //console.log(res);
      const data = res.result
      //1. 获取轮播图数据
      this.topImages = data.itemInfo.topImages
      //2. 获取商品详情数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //3. 获取商店信息数据
      this.shop = new Shop(data.shopInfo)
      //4. 获取商品图片展示信息
      this.goodsInfo = data.detailInfo
      //5. 获取商品参数
      this.goodsParams = new GoodsParams(data.itemParams.info, data.itemParams.rule)
      //6. 商品评价
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0] || {}
      }

    })
    //3. 推荐数据
    getDetailRecommend().then(res => {
      //console.log(res)
      this.recommend = res.data.list
    })
    //4. 给getThemeTopY赋值  点击导航栏跳转到对应的内容
    this.getThemeTopY = debounce(()=>{
      this.themeTopY = []

      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.params.$el.offsetTop)
      this.themeTopY.push(this.$refs.comment.$el.offsetTop)
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop)

      console.log(this.themeTopY)
    },100)
  },
  mounted() {

  },
  destroyed() {
    //1. 取消全局事件的监听
    this.$bus.$off("itemLoadImg", this.itemImgListener)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    //监听图片加载
    imgLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index]+44, 300)
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
