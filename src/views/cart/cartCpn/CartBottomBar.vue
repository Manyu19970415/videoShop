<template>
  <div class="cart_buttom_bar">
    <div>
      <check-button
        :isChecked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
      <div class="total_price">合计{{ totalPrice }}</div>
      <span class="total_count right">结算：{{ checkedLength }}</span>
    </div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
export default {
  name: "CartBottomBar",
  components: { CheckButton },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.$store.state.cartList.filter((item) => {
        item.checked;
      }).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length == 0) return false;

      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //全部选择
        this.$store.state.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        this.$store.state.cartList.forEach((item) => {
          item.checked = true;
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.cart_buttom_bar {
  height: 40px;
  background-color: #eee;
  padding-left: 10px;
  span {
    padding-left: 5px;
    height: 40px;
    line-height: 40px;
  }
  .total_price {
    display: inline-block;
    padding-left: 10px;
  }
  .total_count {
    display: inline-block;
    padding: 0 10px;
    color: #eee;
    background-color: rgb(240, 110, 50);
  }
}
</style>