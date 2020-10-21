//混入
import {debounce} from "common/utils"

//监听图片加载
export const itemImgListener = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //防抖动
    const refresh = debounce(this.$refs.scroll.refresh, 20)
    //接收图片加载完，事件监听 重新计算滑动高度
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on("itemLoadImg", this.itemImgListener)

    //console.log("我是混入");
  }
}
//返回顶部按钮功能
export const listenerBackTop = {
  data() {
    return {
      isBackTopShow: false
    }
  },
  methods: {
    //点击返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    //是否显示backTop
    listenerBackTopShow(position) {
      this.isBackTopShow = (-position.y) > 1000
    }
  }
}
