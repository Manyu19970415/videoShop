<template>
  <div class="cart_list">
    <scroll class="cart_content" ref="scroll">
      <cart-list-item
        v-for="item in cartList"
        :key="item.iid"
        :itemInfo="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>
<script>
import Scroll from "common/scroll/Scroll.vue";
import CartListItem from "./CartListItem.vue";
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: { Scroll, CartListItem },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>
<style lang="less" scoped>
.cart_list {
  height: calc(100% - 134px);
  overflow: hidden;
  .cart_content {
    height: 100%;
  }
}
</style>