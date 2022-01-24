<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles"
      :key="index"
      :class="{ active: index == currentIndex }"
      @click="tabControlClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    tabControlClick(index) {
      this.currentIndex = index;
      console.log(index);
      this.$emit("tabClick", index);
    },
  },
};
</script>
<style lang="less" scoped>
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