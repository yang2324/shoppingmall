<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default(){
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default(){
        return false
      }
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    //2.获取滑动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        this.$emit("scroll", position)
      })
    }

    //3.监听上拉事件滑动底部加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        //传出数据
        this.$emit("pullingUp")
      })
    }

  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.scrollY : 0
    }
  }
}
</script>

<style scoped>

</style>
