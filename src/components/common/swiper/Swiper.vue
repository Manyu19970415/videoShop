<template>
  <div id="hy-swiper">
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div
          v-for="(item, index) in slideCount"
          :key="index"
          class="indi-item"
          :class="{ active: index === currentIndex - 1 }"
        ></div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Swiper",
  props: {
    //切换图片时间 ms
    interval: {
      type: Number,
      default: 3000,
    },
    //transition 变换时间
    animDuration: {
      type: Number,
      default: 300,
    },
    //滑动屏幕多少距离会切换下一张图片
    moveRatio: {
      type: Number,
      default: 0.25,
    },
    // 显示下方圆点
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      slideCount: 0, //轮播图图片元素个数
      totalWidth: 0, //swiper的宽度
      swiperStyle: {}, //swiper的样式
      currentIndex: 1, //当前的index
      scrolling: false, //是否正在滚动
    };
  },
  mounted() {
    setTimeout(() => {
      this.handleDom();
      // 开启定时器
      this.startTimer();
    }, 1000);
  },
  methods: {
    /**
     *  操作DOM,在DOM前后添加轮播图子项
     */
    handleDom() {
      //1. 获取要操作的元素
      let swiperEl = document.querySelector(".swiper");
      let swiperEls = swiperEl.getElementsByClassName("SwiperItem");
      // 2. 保存图片数量
      this.slideCount = swiperEls.length;
      // 3. 如果图片数量大于1张,那么就在前后分别添加一个SwiperItem
      if (this.slideCount > 1) {
        let cloneFirst = swiperEls[0].cloneNode(true);
        let cloneLast = swiperEls[this.slideCount - 1].cloneNode(true);
        // 克隆最后一张图片添加到最前面
        swiperEl.insertBefore(cloneLast, swiperEls[0]);
        // 克隆第一张图片添加到最后面
        swiperEl.appendChild(cloneFirst);
        // 相当于屏幕宽度
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }
      // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
      this.setTransform(-this.totalWidth);
    },
    /**
     * 定时器事件
     */
    startTimer() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    stopTimer() {
      window.clearInterval(this.playTimer);
    },
    /**
     * 触摸事件
     */
    // 触摸开始
    touchStart: function (e) {
      //1  如果正在滚动 不允许拖动
      if (this.scrolling) return;
      // 2 停止定时器
      this.stopTimer();
      // pageX 触摸目标在页面中的x坐标
      // e.touches[0].pageX
      //3  保存触摸时开始的位置 即开始滚动的位置
      this.startX = e.touches[0].pageX;
    },
    // 触摸点改变 滑动时
    touchMove: function (e) {
      // console.log("move: " + e.touches[0].pageX);
      //滑动到的地方
      this.currentX = e.touches[0].pageX;
      //滑动的距离 向左滑是负数,向右滑是正数
      this.distance = this.currentX - this.startX;
      //
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;
      // 2 设置当前位置
      this.setTransform(moveDistance);
    },
    /**
     * 设置滚动位置
     */
    setTransform(position) {
      this.swiperStyle.transform = `translate3d(${position}px,0,0)`;
      this.swiperStyle["-webkit-transform"] = `translate3d(${position}px,0,0)`;
      this.swiperStyle["-ms-transform"] = `translate3d(${position}px,0,0)`;
    },
    // 触摸结束 手指离开屏幕时
    touchEnd: function (e) {
      //1. 获取最终移动的距离
      let currentMove = Math.abs(this.distance);
      // 2. 判断最终的距离
      if (this.distance == 0) {
        return;
      } else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        //向右 在第一张图片做右滑操作时,图片长度会-1变成0 ,需要在checkPosition()中将长度重置为slideCount
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        //向左  在最够一张图片做左滑操作时index再+1,会超过长度 再checkPosition()中重置成1
        this.currentIndex++;
      }
      // 3 移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);
      //4 移动完成之后重新开启定时器
      this.stopTimer();
    },
    /**
     * 滚动到对应图片
     */
    scrollContent(currentPosition) {
      //0 开始滚动
      this.scrolling = true;
      // 1 开始滚动动画
      this.swiperStyle.transition = "transform " + this.animDuration + "ms";

      this.setTransform(currentPosition);
      //2 判断滚动到的位置
      this.checkPosition();
      //  3 滚动完成
      this.scrolling = false;
    },
    /**
     *
     *效验位置
     */
    checkPosition() {
      window.setTimeout(() => {
        // 校验位置
        this.swiperStyle.transition = "0ms";
        if (this.currentIndex >= this.slideCount + 1) {
          //最后一张图片与第一张相同,要回到第一张图片位置上
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          //第一张图片与最后一张相同,要回到最后一张图片位置
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
      }, this.animDuration);
    },
  },
};
</script>
<style lang="less" scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
  .swiper {
    display: flex;
  }
  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
    .indi-item {
      box-sizing: border-box;
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: #fff;
      line-height: 8px;
      text-align: center;
      font-size: 12px;
      margin: 0 5px;
    }
  }
  .indi-item.active {
    background-color: rgba(212, 62, 46, 1);
  }
}
</style>