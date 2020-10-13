<template>
  <div id="home">
    <!--头部导航栏-->
    <nav-bar class="nav_bar">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pullUpLoad="true">
      <!--轮播图-->
      <home-swiper :banners="banners"/>
      <!--推荐-->
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control class="tab-control"
                   :title="['流行','新款','精选']"
                   @tabControl="tabControl"/>

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
      isBackTopShow: false
    }
  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
    //接收图片加载完，重新计算滑动高度
    this.$bus.$on("itemLoadImg", () => {
      this.$refs.scroll && this.$refs.scroll.refresh()
      console.log('滑动');
    })
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    tabControl(index) {
      //console.log(index);
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
    },
    //点击返回顶部
    backClick() {
      //this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0, 0)
    },
    //滑动到一定距离显示隐藏置顶按钮
    contentScroll(position) {
      //console.log(position);
      this.isBackTopShow = (-position.y) > 1000
    },
    //上拉加载更多
    // pullUpLoad(){
    //   //console.log('加载更多');
    //   this.getHomeGoods(this.currentType)
    //
    //   //调用重新计算
    //   this.$refs.scroll.scroll.refresh()
    // },
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

        //当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
        //this.$refs.scroll.finishPullUp()
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
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

</style>
