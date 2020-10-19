<template>
  <div id="home">
    <!--头部导航栏-->
    <nav-bar class="nav_bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :title="['流行','新款','精选']"
                 @tabControl="tabControl"
                 ref="tabControl2" v-show="isTabFixed"/>

    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="loadMore">
      <!--轮播图-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!--推荐-->
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control :title="['流行','新款','精选']"
                   @tabControl="tabControl"
                   ref="tabControl1"/>

      <goods-list :goods="showGoods"/>
    </scroll>

    <!--置顶按钮-->
    <back-top @click.native="backClick" v-show="isBackTopShow"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import HomeFeatureView from "./childComps/HomeFeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import {getHomeMultidata, getHomeGoods} from "network/home";
import {itemImgListener} from "common/mixin"

export default {
  name: "home",
  components: {
    GoodsList,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    NavBar,
    TabControl,
    Scroll,
    BackTop
  },
  mixins: [itemImgListener],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: "pop",
      isBackTopShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    //刷新
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //1. 保存y值
    this.saveY = this.$refs.scroll.getScrollY()
    //2. 取消全局事件的监听
    this.$bus.$off("itemLoadImg", this.itemImgListener)
  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {

  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    //点击商品导航栏加载对应的数据类型
    tabControl(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    //点击返回顶部
    backClick() {
      //this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0, 0)
    },
    //滑动到一定距离显示隐藏置顶按钮
    contentScroll(position) {
      //1. 是否显示backTop
      this.isBackTopShow = (-position.y) > 1000
      //2. tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    //上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    //获取tabControl到顶部的距离
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
    },
    //获取数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        //console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    //获取分类商品的详情信息
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  position: relative;
  height: 100vh;
}

.nav_bar {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;

  /*position: fixed;*/
  /*top: 0;*/
  /*left: 0;*/
  /*right: 0;*/
}

.tab-control {
  position: relative;
  z-index: 9;
}

/*.content {*/
/*  height: calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}*/

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
}
</style>
