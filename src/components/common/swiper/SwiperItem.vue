<template>
  <div class="SwiperItem">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "SwiperItem",
};
</script>
<style lang="less" scoped>
.SwiperItem {
  width: 100%;
  flex-shrink: 0;
  img {
    width: 100%;
  }
}
</style>