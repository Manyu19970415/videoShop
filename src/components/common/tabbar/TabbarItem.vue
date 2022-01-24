<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-acitve"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabbarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#ff5777",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
};
</script>
<style lang="less" scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  color: #333;
  img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
}
</style>