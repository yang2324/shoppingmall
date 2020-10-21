<template>
  <div class="bottom-bar">
    <div class="check-box">
      <check-button class="check-btn"/>
      <span>全选</span>
    </div>
    <div class="total-prices">
      合计：<span>{{ totalPrices }}</span>元
    </div>
    <div class="calculate">
      提交订单（{{ calculate }}）
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartButtonBar",
  components: {
    CheckButton
  },
  computed: {
    //计算总价
    totalPrices() {
      return "¥" + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    //计算订单个数
    calculate() {
      return this.$store.state.cartList.filter(item => item.checked).length
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  height: 40px;
  background-color: #eee;
  line-height: 40px;

  display: flex;
  justify-content: space-between;
}

.check-box {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.check-btn {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
}

.total-prices {
  font-size: 16px;
}
.total-prices span{color: red}
.calculate{
  background: linear-gradient(to right, #ff6034, #ee0a24);
  color: #fff;
  padding: 0 15px;
}
</style>
