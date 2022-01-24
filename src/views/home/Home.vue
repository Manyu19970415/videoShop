<template>
  <div id="home">
    <nav-bar class="homenav">
      <div slot="center">商品</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="topTab"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImgLoad="swiperImgLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="canTop"></back-top>
  </div>
</template>
<script>
import HomeSwiper from "./homeCpn/HomeSwiper.vue";
import RecommendView from "./homeCpn/RecommendView.vue";
import FeatureView from "./homeCpn//FeatureView.vue";

import NavBar from "common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from "@/common/utils";
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      //回到顶部按钮是否显示
      canTop: false,
      tabOffsetTop: 0,
      //吸顶效果
      isTabFixed: false,
      // 保存离开时的Y坐标
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  beforeMount() {
    //1 请求轮播图 推荐数据
    this.getHomeMultidata();
    //2 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    // 3 监听item中的图片加载完成
  },
  mounted() {
    // refresh= function (...args) {
    //     if (timer) clearTimeout(timer);
    //     timer = setTimeout(() => {
    //       func.apply(this.args);
    //     }, delay);
    //   };
    //图片加载完成事件
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("itemImgLoad", () => {
      refresh();
      // this.$refs.scroll && this.$refs.scroll.refresh();
    });
    //获取tabControl的offsetTop
    //tabcontrol没有offsetTop属性  所有的组件都有一个属性,用于获取组件中的元素
    // console.log(this.$refs.tabControl.offsetTop);
    //如果图片还没有加载好 那么会拿到一个很小的值,这时候的值是错误的
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },

  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  methods: {
    /**网络请求相关方法
     *
     */
    //1 请求轮播图 推荐数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //2 请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // 将请求到的数据添加到数组中
        this.goods[type].list.push(...res.data.list);
        //请求结束 页码加一
        this.goods[type].page++;
        // 完成了上拉加载更多之后
        this.$refs.scroll.finishPullUp();
      });
    },

    /**
     * 事件监听相关的方法
     */

    //tabcontrol切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 回到顶部按钮点击事件
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 子组件滚动事件
    contentScroll(position) {
      //1  判断backTop是否显示
      this.canTop = position.y < -1000;
      //2 决定tabControl是否吸顶(fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    //加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    // 轮播图加载完成
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
};
</script>
<style lang="less" scoped>
#home {
  // padding-top: 44px;
  position: relative;
  height: 100vh;
  .homenav {
    background-color: var(--color-tint);
    color: #fff;
    // position: fixed;
    // top: 0;
    // right: 0;
    // left: 0;
    // 这时候会覆盖下面的轮播图可以通过给#home一个上padding:44px来解决
    // z-index: 9;
  }
  .topTab {
    position: relative;
    z-index: 2;
    top: -1px;
  }
  // .content {
  //   margin-top: 44px;
  //   height: calc(100% - 93px);
  //   overflow: hidden;
  //这种方法确定content的高度时,home就不用加padding了
  // }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>