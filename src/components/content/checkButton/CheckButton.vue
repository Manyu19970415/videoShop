<template>
  <div class="check_button" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" v-show="isChecked" />
  </div>
</template>
<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="less" scoped>
.check_button {
  border: 2px solid #888;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  display: inline-block;
}
.check {
  border: none;
  background-color: rgba(238, 119, 119, 0.733);
}
</style>