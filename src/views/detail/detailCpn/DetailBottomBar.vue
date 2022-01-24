<template>
  <div class="detail_bottombar">
    <div class="bar_item bar_left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar_item bar_right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBottomBar",
  data() {
    return {};
  },
  methods: {
    //点击添加购物车
    addToCart() {
      this.$emit("addCart");
    },
  },
};
</script>
<style lang="less" scoped>
.detail_bottombar {
  background-color: #fff;
  height: 55px;
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-around;
  .bar_item {
    flex: 1;
    display: flex;
    justify-content: space-around;
  }
  .bar_left {
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .icon {
        display: inline-block;
        width: 25px;
        height: 25px;
        background-image: url(~assets/img/detail/detail_bottom.png);
        background-size: 25px;
      }
      .service {
        background-position-y: 112px;
      }
      .shop {
        background-position-y: 60px;
      }
      .select {
        background-position-y: 2px;
      }
    }
  }
  .bar_right {
    div {
      line-height: 55px;
      flex: 1;
      text-align: center;
    }
    .cart {
      color: #000;
      font-weight: 400;
      background-color: rgb(240, 236, 20);
    }
    .buy {
      color: #fff;
      background-color: var(--color-high-text);
    }
  }
}
</style>