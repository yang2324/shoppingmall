<template>
  <div class="cart">
    <!--导航栏-->
    <nav-bar class="nav_bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!--列表内容-->
    <cart-list class="cart-list"/>
    <!--底部结算-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import {mapGetters} from "vuex"

export default {
  name: "shopcart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters({
      length: "cartLength"
    })
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}
</style>
