<template>
  <div class="comment_info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="info_header">
      <div class="header_title">用户评论</div>
      <div class="header_more">
        更多
        <i class="arrow_right"></i>
      </div>
    </div>
    <div class="info_user">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="info_detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info_other">
        <span class="date">{{ time }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="info_imgs">
        <img
          :src="item"
          alt=""
          v-for="(item, index) in commentInfo.images"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/common/utils.js";
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    time() {
      //1 将时间戳转换成Date对象  10位时间戳是秒要乘1000,13是毫秒
      // const date = new Date(value*1000)
      // console.log();
      const date = new Date(this.commentInfo.created * 1000);
      // console.log(date);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.comment_info {
  border-top: 3px solid #ddd;
  margin: 5px 20px;
  .info_header {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
    border-bottom: 2px solid #ddd;
  }
  .info_user {
    img {
      width: 60px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  .info_detail {
    p {
      text-indent: 1rem;
      padding: 2px;
    }
    .info_other {
      padding: 5px 2px;
      .date {
        margin-right: 10px;
      }
    }
  }
  .info_imgs {
    img {
      width: 100px;
      height: 100px;
      margin: 10px 5px;
      display: inline-block;
    }
  }
}
</style>