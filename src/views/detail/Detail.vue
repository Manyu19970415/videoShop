<template>
  <div id="detail">
    <detail-nav @itemClick="itemClick" ref="nav"></detail-nav>
    <scroll
      class="detail_content"
      ref="scroll"
      @scroll="contentScroll"
      :probeType="3"
    >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        :paramInfo="paramInfo"
        ref="params"
      ></detail-param-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list
        :goods="recommendInfo"
        class="recommendList"
        ref="recommend"
      ></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="canTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>
<script>
import DetailNav from "./detailCpn/DetailNav.vue";
import DetailSwiper from "./detailCpn/DetailSwiper.vue";
import DetailBaseInfo from "./detailCpn/DetailBaseInfo.vue";
import DetailShopInfo from "./detailCpn/DetailShopInfo.vue";
import DetailGoodsInfo from "./detailCpn/DetailGoodsInfo.vue";
import DetailParamInfo from "./detailCpn/DetailParamInfo.vue";
import DetailCommentInfo from "./detailCpn/DetailCommentInfo.vue";
import DetailBottomBar from "./detailCpn/DetailBottomBar.vue";

import Scroll from "common/scroll/Scroll.vue";
// import Toast from "common/toast/Toast.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import { backTopMinin } from "@/common/mixin.js";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
import { debounce } from "@/common/utils";
import { mapActions } from "vuex";
export default {
  name: "Detail",
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    // Toast,
    GoodsList,
  },
  mixins: [backTopMinin],
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      themeTops: [],
      currentIndex: 0,
      getThemeY: null,
      // message: "",
      // show: false,
    };
  },
  created() {
    //1 获取id
    this.iid = this.$route.params.iid;
    //请求详情数据
    getDetail(this.iid)
      .then((res) => {
        // 1 获取顶部图片
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        // 2 获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 3 店铺信息
        this.shop = new Shop(data.shopInfo);
        //4 商品详情详细数据
        this.detailInfo = data.detailInfo;
        //5 获取参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 6 取出评论的信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
        this.$nextTick(() => {});
      })
      .catch((err) => err);
    // 请求推荐数据
    getRecommend()
      .then((res) => {
        this.recommendInfo = res.data.list;
      })
      .catch((err) => console.log(err));
    // 给getThemeY 赋值
    this.getThemeY = debounce(() => {
      this.themeTops = [];
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.params.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      this.themeTops.push(Number.MAX_VALUE);
    }, 100);
  },
  mounted() {},
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeY();
    },
    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 20);
    },
    //滚动
    contentScroll(position) {
      this.canTop = position.y < -1000;
      const positionY = -position.y;
      let length = this.themeTops.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex != i &&
          positionY >= this.themeTops[i] &&
          positionY < this.themeTops[i + 1]
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    //加入购物车
    addToCart() {
      // 获取购物车需要获取的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      this.addCart(product).then((res) => {
        console.log(this.$toast);
        // console.log(this.$toast.methods.show(res, 1000));
        this.$toast.show(res, 1000);
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1000);
      });
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
    },
  },
};
</script>
<style lang="less" scoped>
#detail {
  position: relative;
  background-color: #fff;
  z-index: 9;
  height: 100vh;
  .detail_content {
    height: calc(100% - 99px);
    overflow: hidden;
  }
  .recommendList {
    padding: 0 10px;
  }
}
</style>