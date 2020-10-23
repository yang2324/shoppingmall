<template>
  <div class="category">
    <!--头部导航栏-->
    <nav-bar class="nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <!--左边菜单栏-->
    <slide-bar :category-list="categoryList" @slideBarItemClick="slideBarItemClick"/>

    <scroll class="scroll-content" ref="scroll">
      <!--右边对应内容显示-->
      <sub-category :subcategoryList="subcategoryList"/>
      <!--商品列表菜单栏-->
      <tab-control :title="['流行','新款','精选']"
                   @tabControl="tabControl"
                   ref="tabControl"/>
      <!--商品列表信息-->
      <goods-list :goods="categoryDetailList"/>
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import SlideBar from "./childComps/SlideBar";
import SubCategory from "./childComps/SubCategory";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import {getCategory, getSubcategory, getCategoryDetail} from "network/category"

export default {
  name: "category",
  data() {
    return {
      categoryList: [],
      subcategoryList: [],
      categoryDetailList: [],
      currentIndex: 0
    }
  },
  components: {
    NavBar,
    SlideBar,
    SubCategory,
    Scroll,
    TabControl,
    GoodsList
  },
  created() {
    //左边菜单栏内容调用
    this.getCategory()
  },
  activated() {
    //刷新
    this.$refs.scroll.refresh()
  },
  methods: {
    slideBarItemClick({maitKey, index}) {
      // 防止反复请求
      if (this.currentIndex === index) return;
      this.currentIndex = index;
      // 每次切换分类初始化tabControl的下标
      this.$refs.tabControl.currentIndex = 0;

      this.getSubcategory(maitKey);
      // 请求对应的推荐列表
      this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, "pop");
    },
    //左边菜单栏内容
    getCategory() {
      getCategory().then(res => {
        //console.log(res);
        this.categoryList = res.data.category.list
        this.$nextTick(() => {
          this.getSubcategory(this.categoryList[0].maitKey);
          this.getCategoryDetail(this.categoryList[0].miniWallkey, "pop");
        });
      })
    },
    //对应菜单栏内容信息
    getSubcategory(key) {
      getSubcategory(key).then(res => {
        ///console.log(res);
        this.subcategoryList = [...res.data.list];
      });
    },
    //对应菜单栏的列表信息
    getCategoryDetail(key, type) {
      getCategoryDetail(key, type).then(res => {
        //console.log(res);
        this.categoryDetailList = [...res]
      })
    },
    tabControl(index) {
      const typeList = ["pop", "new", "sell"];
      // 切换类型数据
      this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, typeList[index]);
    }
  }
}
</script>

<style scoped>
.nav {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;
}

.scroll-content {
  position: fixed;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 100px;
  overflow: hidden;
}
</style>
