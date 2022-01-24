<template>
  <div class="detail_base_info" v-if="Object.keys(goods).length !== 0">
    <div class="info_title">{{ goods.title }}</div>
    <div class="info_price">
      <span class="n_price">{{ goods.newPrice }}</span>
      <span class="o_price">{{ goods.oldPrice }}</span>
      <span class="discount" v-if="goods.discount">{{ goods.discount }}</span>
    </div>
    <div class="info_other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info_service">
      <span
        class="info_service_item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style lang="less" scoped>
.detail_base_info {
  font-size: 14px;
  .info_title {
    color: #111;
    text-indent: 1em;
    line-height: 1.2;
    margin: 5px;
  }
  .info_price {
    .n_price {
      color: var(--color-high-text);
      font-size: 16px;
    }
    .o_price {
      text-decoration-line: line-through;
      font-size: 12px;
      padding: 0 5px;
    }
    .discount {
      background-color: #fc637f;
      border-radius: 8px;
      display: inline-block;
      height: 20px;
      line-height: 16px;
      box-sizing: border-box;
      padding: 2px;
      color: #fff;
    }
  }
  .info_other {
    display: flex;
    justify-content: space-between;
    padding: 15px 10px;
    border-bottom: 1px solid #eee;
  }
  .info_service {
    display: flex;
    justify-content: space-between;
    padding: 20px 5px;
    border-bottom: 2px solid #eee;
  }
  img {
    width: 15px;
    height: 15px;
  }
}
</style>