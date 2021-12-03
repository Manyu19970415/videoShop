<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  components: {},
};
</script>

<style lang="less" scoped>
#tab-bar {
  display: flex;
  background-color: #f1f1f1;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0px -1px 1px rgba(19, 6, 6, 0.3);
}
</style>
