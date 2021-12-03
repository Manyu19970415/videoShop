<template>
  <div id="MainTabbar">
    <tab-bar>
      <tabbar-item path="/home">
        <img src="~assets/img/tabbar/home1.png" alt="" slot="item-icon" />
        <img src="~assets/img/tabbar/home.png" alt="" slot="item-icon-acitve" />
        <div slot="item-text">首页</div>
      </tabbar-item>
      <tabbar-item path="/cart">
        <img src="~assets/img/tabbar/shop.png" alt="" slot="item-icon-acitve" />
        <img src="~assets/img/tabbar/shop1.png" alt="" slot="item-icon" />
        <div slot="item-text">购物车</div>
      </tabbar-item>
      <tabbar-item path="/category">
        <img
          src="~assets/img/tabbar/category.png"
          alt=""
          slot="item-icon-acitve"
        />
        <img src="~assets/img/tabbar/category1.png" alt="" slot="item-icon" />
        <div slot="item-text">分类</div>
      </tabbar-item>
      <tabbar-item path="/profile">
        <img src="~assets/img/tabbar/my.png" alt="" slot="item-icon-acitve" />
        <img src="~assets/img/tabbar/my1.png" alt="" slot="item-icon" />
        <div slot="item-text">我的</div>
      </tabbar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "common/tabbar/TabBar.vue";
import TabbarItem from "common/tabbar/TabbarItem.vue";
export default {
  components: { TabBar, TabbarItem },
};
</script>

<style>
</style>
