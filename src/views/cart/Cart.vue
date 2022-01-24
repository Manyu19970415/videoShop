<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav_bar">
      <div slot="center">购物车（{{ newName }}）</div></nav-bar
    >
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>
<script>
import NavBar from "common/navbar/NavBar.vue";
import CartList from "./cartCpn/CartList.vue";
import CartBottomBar from "./cartCpn/CartBottomBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: { NavBar, CartList, CartBottomBar },
  computed: {
    // ...mapGetters(["cartLength"]),
    //起新名称
    ...mapGetters({
      newName: "cartLength",
    }),
  },
};
</script>
<style lang="less" scoped>
.cart {
  height: 100vh;

  .nav_bar {
    background: var(--color-tint);
    color: #fff;
  }
}
</style>