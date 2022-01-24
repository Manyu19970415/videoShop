<template>
  <div class="detailNav">
    <nav-bar>
      <template v-slot:left>
        <img
          src="~assets/img/common/back.svg"
          alt=""
          class="back_img"
          @click="backImgClick"
        />
      </template>
      <template v-slot:center>
        <div class="tab-control">
          <div
            class="tab-control-item"
            v-for="(item, index) in titles"
            :key="index"
            :class="{ active: index == currentIndex }"
            @click="tabClick(index)"
          >
            <span>{{ item }}</span>
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
export default {
  name: "DetailNav",
  components: { NavBar, TabControl },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    tabClick(index) {
      console.log(index);
      this.currentIndex = index;
      console.log(this.currentIndex);
      this.$emit("itemClick", index);
    },
    backImgClick() {
      this.$router.back();
      // this.$router.go(-1);
    },
  },
};
</script>
<style lang="less" scoped>
.detail_nav_center {
  display: flex;
  .detail_nav_item {
    flex: 1;
  }
}
.back_img {
  margin-top: 13px;
  width: 18px;
}
.tab-control {
  display: flex;
  text-align: center;
  font-size: 16px;
  background-color: #fff;

  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .active {
    color: var(--color-high-text);
    span {
      padding: 5px;
      border-bottom: 2px solid var(--color-high-text);
    }
  }
}
</style>