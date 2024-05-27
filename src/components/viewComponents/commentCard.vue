<template>
  <div>
    <div class="main_comment_card">
      <div class="main_userInfo">
        <div
          class="userInfo_avatar"
          @click="enterUserPage(comment.userInfo.userId)"
        >
                <img
          :src="comment.userInfo.avatar"
          alt="头像"
          @click="enterUserPage(comment.userInfo.userId)">
        </div>

        <span class="userInfo_username">{{ comment.userInfo.username }}</span>
        <span class="userInfo_level">{{ comment.userInfo.level }}</span>
        <!-- <span class="userInfo_userId">{{ comment.userInfo.userId }}</span> -->
      </div>
      <div class="main_comments_card_content">
        <div class="content_html" v-html="comment.body"></div>


      </div>
      <div class="main_comments_card_operator_container">
        <div class="main_comments_card_operator_container_left">
          {{ comment.date }}
        </div>
        <div class="main_comments_card_operator_container_right">
          <img alt="点赞"
            v-if="comment.isLiked === 1"
            src="../../assets/icon/thumb-up1.svg"
            @click="thumbUp"
          />
          <img alt="点赞" v-else src="../../assets/icon/thumb-up.svg" @click="thumbUp" />
          <div class="other_info_operations_number">{{ comment.thumbUp }}</div>
          <img alt="点踩"
            v-if="comment.isLiked === -1"
            src="../../assets/icon/thumb-down1.svg"
            @click="thumbDown"
          />
          <img
            v-else alt="点踩"
            src="../../assets/icon/thumb-down.svg"
            @click="thumbDown"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import { UserInfo } from "../../types";

interface Comment {
  id: number;
  body: string;
  date: string;
  thumbUp: number;
  isLiked: number;
  userInfo: UserInfo;
}


export default {
  name: "CommentCard",
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true,
    },
  },

  setup(props:any, cxy:any) {
    const thumbUp = () => {
      //根据id获得 评论, 调用父组件的方法
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

    const enterUserPage = (id:any) => {
      console.log(id);
    };

    return { thumbUp, thumbDown, enterUserPage };
  },

};
</script>

<style scoped>
.main_userInfo {
  width: 100%;
  height: 35px;
  background-color: transparent;
  align-items: center;
  /* border-bottom: 1px solid rgb(162, 160, 160); */
}

.userInfo_avatar img {
  width: 32px;
  height: 32px;
  background-color: transparent;
  display: inline;
  float: left;
  margin-left: 10px;
  border-radius: 50%;
}

.userInfo_avatar {
  width: 30px;
  height: 30px;
  align-content: center;
  display: inline;
}

.userInfo_username {
  color: rgb(151,151,151);
  align-items: center;
  font-size: 0.95em;
  margin-left: 10px;
  margin-top: 5px;
}
.userInfo_level {
  background-color:rgb(176, 231, 109);
  width: 36px;
  text-align: center;
  font: 0.8em sans-serif;
  margin-left: 10px;
  border-radius: 5px;
}

.userInfo_userId {
  align-items: center;
  font: 0.5em sans-serif;
  margin-left: 10px;
}

.main_comment_card {
  width: 100%;
  background-color: rgb(255, 255, 255);
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid rgb(162, 160, 160);
}

.main_comments_card_content {
  line-height: 18px;
  margin-top: 18px;
  margin-left: 30px;
  background-color: transparent;
}

.main_comments_card_content p {
  width: 100%;
  margin-top: 300px;
  color: black;
  font-size: 1em;
  
  word-wrap: break-word;
  word-break: break-all;
}
.main_comments_card_content img {
  max-width: 80%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.main_comments_card_operator_container {
  width: 100%;
  height: 25px;
  background-color: rgb(255, 255, 255);
  margin: 10px 0 0 0;
}

.main_comments_card_operator_container_left {
  width: 40%;
  height: 25px;
  background-color: transparent;
  color: rgb(151,151,151);
  font: 0.8em sans-serif;
  float: left;
}

.main_comments_card_operator_container_right {
  width: 15%;
  height: 25px;
  background-color: transparent;
  float: right;
  display: flex;
}

.main_comments_card_operator_container_right img {
  width: 25px;
  height: 25px;
  background-color: transparent;
  color: rgb(233, 219, 219);
  border: none;
  display: inline-block;
  cursor: pointer;
}

.main_comments_card_operator_container_right img:hover {
  background-color: rgb(71, 74, 88);
  border-radius: 5px;
}

.main_comments_card_subComments_container {
  width: 90%;
  min-height: 20px;
  background-color: rgb(174, 169, 169);
  padding: 2px;
  margin-left: 50px;
  margin-top: 10px;
  box-sizing: border-box;
  border: 1px solid rgb(162, 160, 160);
  border-radius: 5px;
}

.main_comments_card_subComments_card {
  width: 100%;
  max-height: 200px;
  background-color: rgb(174, 169, 169);
  box-sizing: border-box;
  margin-top: 10px;
  border: 1px solid rgb(162, 160, 160);
  border-radius: 5px;
}

.main_comments_card_subComments_more_reply {
  width: 100%;
  height: 20px;
  background-color: transparent;
  align-items: center;
  cursor: pointer;
  text-align: center;
}



.otherinfo_operations {
  width: 15%;
  height: 26px;
  background-color: transparent;
  align-items: center;
  float: right;
  display: flex;
}

.otherinfo_operations img {
  height: 100%;
  background-color: transparent;
  align-items: center;
  display: inline-block;
}

.otherinfo_operations img:hover {
  height: 100%;
  background-color: rgb(131, 188, 152);
  align-items: center;
  display: inline-block;
}

.otherinfo_operations_number {
  height: 100%;
  background-color: transparent;
  display: inline-block;
  text-align: center;
  font-size: 0.8em;
  line-height: 24px;
}

:deep(.content_html img) {
  max-width: 80%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

:deep(.content_html p) {
  width: 100%;
  margin-top: 8px;
  color: rgb(51,51,51);
  font-size: 1em;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
