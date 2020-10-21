<template>
  <div class="check-button" :class="{active:isChecked}">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.check-button {
  border: 2px solid #aaa;
  border-radius: 50%;
}
.active{
  background-color: #ff5777;
  border: 2px solid #ff5777;
}
</style>
