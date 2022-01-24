<template>
  <swiper class="detail_swiper">
    <swiper-item v-for="item in topImages" :key="item">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "common/swiper";
export default {
  name: "DetailSwiper",
  components: { Swiper, SwiperItem },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style lang="less" scoped>
.detail_swiper {
  height: 200px;
  overflow: hidden;
}
</style>