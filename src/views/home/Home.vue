<template>
  <div id="home">
    <nav-bar class="homenav">
      <div slot="center">商品</div>
    </nav-bar>
    <swiper ref="swiper" v-if="banners.length">
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import NavBar from "common/navbar/NavBar.vue";
import { Swiper, SwiperItem } from "common/swiper";
import { getHomeMultidata } from "network/home.js";
export default {
  name: "Home",
  components: {
    NavBar,
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    getHomeMultidata().then((res) => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.homenav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>