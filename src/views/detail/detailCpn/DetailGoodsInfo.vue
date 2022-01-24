<template>
  <div class="goods_info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info_desc clear_fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info_key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info_list">
      <img
        :src="item"
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        @load="imgLoad"
        alt=""
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    };
  },
  watch: {
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    },
  },
  methods: {
    imgLoad() {
      if (++this.counter == this.imagesLength) {
        this.$emit("imageLoad");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.goods_info {
  margin-top: 10px;
  font-size: 14px;
  .info_desc {
    padding: 5px;
    .start,
    .end {
      width: 100px;
      height: 2px;
      background-color: #666;
    }
    .desc {
      padding: 5px;
    }
    .end {
      float: right;
    }
  }
  .info_key {
    padding: 10px;
    font-size: 16px;
  }
  .info_list {
    img {
      width: 100vw;
    }
  }
}
</style>