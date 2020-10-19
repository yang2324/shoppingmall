import {debounce} from "common/utils"

export const itemImgListener = {
  data(){
    return{
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
