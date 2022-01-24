<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.image || goodsItem.show.img" alt="" @load="imgLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      this.$bus.$emit("itemImgLoad");
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
      // this.$router.push({
      //   path: "/detail",
      //   query: {
      //     iid: this.goodsItem.iid,
      //   },
      // });
    },
  },
};
</script>
<style lang="less" scoped>
.goods-item {
  width: 50%;
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  font-size: 14px;
  img {
    width: 98%;
    border-radius: 5px;
  }
  .goods-info {
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 2px 5px;
    }
    .price {
      color: var(--color-high-text);
      padding-right: 10px;
    }
    .collect {
      padding-left: 20px;
      background: url("~assets/img/common/collect.svg") no-repeat 5px 1px;
      background-size: 14px;
    }
  }
}
</style>