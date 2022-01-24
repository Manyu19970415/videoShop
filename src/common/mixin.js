import BackTop from "components/content/backTop/BackTop.vue";

export const backTopMinin = {
  components: {
    BackTop,

  },
  data() {
    return {
      //回到顶部按钮是否显示
      canTop: false,
    }
  },
  methods: {
    // 回到顶部按钮点击事件
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  }
}