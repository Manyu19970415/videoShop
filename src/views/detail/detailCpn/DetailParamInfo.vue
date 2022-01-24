<template>
  <div class="param_info" v-if="Object.keys(paramInfo).length !== 0">
    <table
      v-for="(table, index) in paramInfo.sizes"
      class="info_size"
      :key="index"
    >
      <tr v-for="(tr, index) in table" :key="index">
        <td v-for="(td, index) in tr" :key="index">{{ td }}</td>
      </tr>
    </table>

    <table class="info_param">
      <tr v-for="(info, index) in paramInfo.infos" :key="index">
        <td class="info_param_key">{{ info.key }}</td>
        <td class="param_value">{{ info.value }}</td>
      </tr>
    </table>
    <div class="info_img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style lang="less" scoped>
.param_info {
  .info_param {
    border-top: 1px solid #aaa;
    tr :nth-child(2) {
      color: var(--color-tint);
    }
  }
  table {
    margin: 10px;
    tr :first-child {
      width: 100px;
    }
    td {
      padding: 10px 0 10px 5px;
    }
  }
}
</style>