<template>
  <div class="cart_list_item">
    <div class="item_selector">
      <check-button
        :isChecked="itemInfo.checked"
        @click.native="checkClick"
      ></check-button>
    </div>
    <div class="item_img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item_info">
      <div>
        <div class="item_title">
          {{ itemInfo.title }}
        </div>
        <div class="item_desc">
          {{ itemInfo.desc }}
        </div>
      </div>
      <div class="info_bottom">
        <div class="item_price left">￥{{ itemInfo.price }}</div>
        <div class="item_count right">{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
export default {
  name: "CartListItem",
  components: { CheckButton },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked;
    },
  },
};
</script>
<style lang="less" scoped>
.cart_list_item {
  padding: 5px;
  border-bottom: 1px solid #888;
  display: flex;
  justify-content: space-around;
  .item_selector {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .item_img {
    img {
      width: 80px;
      border-radius: 8px;
    }
  }
  .item_info {
    width: calc(100vw - 120px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .item_title {
      color: #222;
      font-size: 18px;
    }
    .item_desc {
      font-size: 14px;
    }
    .item_title,
    .item_desc {
      white-space: nowrap;
      padding: 5px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .info_bottom {
      .item_price {
        color: rgb(221, 108, 33);
      }
      // position: absolute;
      // bottom: 0;
    }
  }
}
</style>