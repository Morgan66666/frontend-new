<template>
  <div class="comment_card">
    <div class="main_userinfo">
      <div class="userInfo_avatar" @click="enterUserPage()">
        <img src="../../assets/霍霍果照片.png" alt="" />
      </div>
      <span class="userInfo_username" @click="enterUserPage()">{{
        comment.userInfo.username
      }}</span>
      <span class="userInfo_level">{{ comment.userInfo.level }}</span>
      <span class="userInfo_userId">{{ comment.userInfo.userId }}</span>
      <span>{{ comment.userInfo.userMassage }}</span>
    </div>
    <router-link class="router-link" :to="'/comments/' + comment.id">
      <div class="main_card_title">
        <strong>{{ comment.title }}</strong>
      </div>
      <div class="main_card_content">{{ comment.content }}</div>
      <div class="main_card_img">
        <img src="../../assets/霍霍果照片.png" alt="" />
        <img src="../../assets/霍霍果照片.png" alt="" />
        <img src="../../assets/霍霍果照片.png" alt="" />
      </div>
    </router-link>

    <div class="other_info_container">
      <div class="other_info_date">
        {{ comment.date }}
      </div>
      <div class="other_info_operations">
        <img
          v-if="comment.isLiked === 1"
          src="../../assets/icon/thumb-up1.svg"
          @click="thumbUp"
        />
        <img v-else src="../../assets/icon/thumb-up.svg" @click="thumbUp" />
        <div class="other_info_operations_number">{{ comment.thumbUp }}</div>
        <img
          v-if="comment.isLiked === -1"
          src="../../assets/icon/thumb-down1.svg"
          @click="thumbDown"
        />
        <img v-else src="../../assets/icon/thumb-down.svg" @click="thumbDown" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";

export default {
  name: "PostComment",

  data() {
    return {
      // Your data properties here
    };
  },
  props: {
    comment: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  computed: {
    // Your computed properties here
  },
  setup(props, cxy) {
    const thumbUp = () => {
      //根据id获得 评论
      cxy.emit("update:thumpUp", {
        id: props.comment.id,
      });
    };

    const thumbDown = () => {
      //根据id获得 评论
      console.log("thumbDown");
      cxy.emit("update:thumpDown", {
        id: props.comment.id,
      });
    };

    return { thumbUp, thumbDown };
  },
  methods: {
    enterUserPage() {
      alert("进入用户页面");
    },

  },
  mounted() {
    // Your mounted hook code here
  },
};
</script>

<style scoped>
.comment_card {
  width: 100%;

  background-color: rgb(189, 233, 239);
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid rgb(162, 160, 160);
}

.comment_card:hover {
  background-color: rgb(146, 227, 238);
}

.main_userinfo {
  width: 100%;
  height: 30px;
  align-items: center;
  display: flex;
  justify-content: left;
}

.main_card_title {
  line-height: 20px;
  margin-top: 8px;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  font-weight: bold;
}

.main_card_content {
  line-height: 18px;
  margin-top: 8px;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  color: #706d6d;
  font-size: 0.8em;
}

.main_card_img img {
  width: 30%;
  height: 180px;
  background-color: rgb(183, 144, 144);
  align-items: center;
  margin-top: 8px;
  margin-left: 10px;
  display: inline-block;
}

.userInfo_avatar img {
  width: 30px;
  height: 30px;
  background-color: rgb(183, 144, 144);
  display: inline;
  float: left;
  border-radius: 50%;
}

.userInfo_avatar {
  width: 30px;
  height: 30px;
  align-content: center;
  display: inline;
}

.userInfo_username {
  color: rgb(45, 44, 44);
  align-items: center;
  font-size: 0.95em;
  margin-left: 10px;
}
.userInfo_level {
  font: 0.5em sans-serif;
  margin-left: 10px;
}

.userInfo_userId {
  align-items: center;
  font: 0.5em sans-serif;
  margin-left: 10px;
}

.router-link {
  text-decoration: none;
  color: black;
}

.other_info_container {
  width: 100%;
  height: 26px;
  margin-top: 10px;
  background-color: transparent;
  align-items: center;
}

.other_info_date {
  width: 30%;
  height: 26px;
  background-color: transparent;
  line-height: 24px;
  display: inline-block;
}

.other_info_operations {
  width: 15%;
  height: 26px;
  background-color: transparent;
  align-items: center;
  float: right;
  display: flex;
}

.other_info_operations img {
  height: 100%;
  background-color: transparent;
  align-items: center;
  display: inline-block;
}

.other_info_operations img:hover {
  height: 100%;
  background-color: rgb(131, 188, 152);
  align-items: center;
  display: inline-block;
}

.other_info_operations_number {
  height: 100%;
  background-color: transparent;
  display: inline-block;
  text-align: center;
  font-size: 0.8em;
  line-height: 24px;
}
</style>
