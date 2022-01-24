<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import ObserveDOM from "@better-scroll/observe-dom";
import ObserveImage from "@better-scroll/observe-image";
BScroll.use(Pullup);
BScroll.use(ObserveDOM);
BScroll.use(ObserveImage);
export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 创建bscroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      observeDOM: true, // 开启 observe-dom 插件
      observeImage: true,
      pullUpLoad: this.pullUpLoad,
    });
    //滚动事件,position是滚动到的位置
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }
    // this.scroll.scrollTo(x,y)
    // 建ringscroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        //监听到滚动到底部事件
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    //滚动到x,y
    //time=300 传参没有time时给time300默认值
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //完成加载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 刷新
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    //获取距离顶部的位置
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>
<style lang="less" scoped>
</style>