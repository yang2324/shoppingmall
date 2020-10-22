<template>
  <div class="bottom-bar">
    <div class="check-box" @click="checkedClick">
      <check-button class="check-btn"
                    :is-checked="isSelectAll"/>
      <span>全选</span>
    </div>
    <div class="total-prices">
      合计：<span>{{ totalPrices }}</span>元
    </div>
    <div class="calculate" @click="calcClick">
      提交订单（{{ calculate }}）
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import {mapGetters} from "vuex"

export default {
  name: "CartButtonBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),

    //计算总价
    totalPrices() {
      return "¥" + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    //计算订单个数
    calculate() {
      return this.cartList.filter(item => item.checked).length
    },
    //是否全选
    isSelectAll() {
      if (this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkedClick() {
      console.log("-----");
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
      if (!this.isSelectAll){
        this.$toast.toastShow("请选择需要支付的商品")
      }
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

.total-prices span {
  color: red
}

.calculate {
  background: linear-gradient(to right, #ff6034, #ee0a24);
  color: #fff;
  padding: 0 15px;
}
</style>
