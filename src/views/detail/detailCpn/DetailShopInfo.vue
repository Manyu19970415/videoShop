<template>
  <div class="detail_shop_info" v-if="Object.keys(shop).length !== 0">
    <div class="shop_top">
      <img :src="shop.logo" alt="" />
      <span class="title">{{ shop.name }}</span>
    </div>
    <div class="shop_middle">
      <div class="shop_middle_item shop_middle_left">
        <div class="info_sells">
          <div class="sells_count">{{ cells }}</div>
          <div class="sells_text">总销量</div>
        </div>
        <div class="info_goods">
          <div class="goods_count">
            {{ shop.goodsCount }}
          </div>
          <div class="goods_text">全部宝贝</div>
        </div>
      </div>
      <div class="shop_middle_item shop_middle_rigth">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="item.isBetter ? 'red' : ' green'">
              {{ item.score }}
            </td>
            <td class="better">
              <span :class="item.isBetter ? ' bgRed' : '  bgGreen'">{{
                item.isBetter ? "高" : "低"
              }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop_bottom">
      <div class="enter_shop">进店逛逛</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    cells() {
      if (this.shop.sells > 10000) {
        return (this.shop.sells / 10000).toFixed(1) + "万";
      } else {
        return this.shop.sells;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.detail_shop_info {
  .shop_top {
    margin-top: 10px;
    line-height: 40px;
    height: 40px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 15px;
    }
    .title {
      padding-left: 10px;
      line-height: 30px;
      vertical-align: top;
    }
  }
  .shop_middle {
    display: flex;
    justify-content: space-between;
    padding: 0px 10px 10px 20px;
    align-items: center;
    color: #222;
    .shop_middle_item {
      flex: 1;
    }
    .shop_middle_left {
      display: flex;
      justify-content: space-around;
      text-align: center;
      border-right: 1px solid #999;
      padding-right: 10px;
      .goods_text,
      .sells_text {
        font-size: 12px;
        margin-top: 10px;
      }
    }
    .shop_middle_rigth {
      display: flex;
      flex-direction: column;
      padding-left: 15px;
      line-height: 1.2;
      tr {
        height: 30px;
      }
    }
  }
  .shop_bottom {
    text-align: center;

    .enter_shop {
      background-color: #eee;
      display: inline-block;
      padding: 2px 10px;
    }
  }
  .green {
    color: green;
  }
  .red {
    color: red;
  }
  .better {
    color: #fff;
    .bgGreen {
      background-color: green;
    }
    .bgRed {
      background-color: red;
    }
  }
}
</style>