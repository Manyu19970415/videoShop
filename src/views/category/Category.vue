<template>
  <div>
    <div class="wrapper">
      <ul class="content">
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
        <li>111111</li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
BScroll.use(Pullup);
export default {
  name: "Category",
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 默认情况下BScroll是不可以实时监听滚动位置的
    // const bs = new BScroll(".wrapper");
    // bs.on("scroll", (position) => {
    //   console.log(position);
    // });
    this.scroll = new BScroll(document.querySelector(".wrapper"), {
      //probe  侦测 默认值是0,
      //0 1 都是不侦测实时的位置
      //2 在手指滚动的过程中侦测,而手指离开后的惯性滚动过程中不侦测
      //3 只要是滚动就侦测
      probeType: 3,
      click: true,
      pullUpLoad: true,
    });
    this.scroll.on("pullingUp", () => {
      console.log("上拉");
      setTimeout(() => {
        this.scroll.finishPullUp();
      }, 1000);
    });
    // this.scroll.on("scroll", (position) => {
    //   // console.log(position);
    // });
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.wrapper {
  height: 200px;
  background-color: #999;
  color: purple;
  overflow: hidden;
}
</style>