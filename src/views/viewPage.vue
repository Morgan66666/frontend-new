<template>
  <div>
    <div class="main_container">
      <div class="main_container_message">
        <div class="main_container_mainMessage">
          <div class="main_main_card">
            <div class="main_main_card_title">{{ post.title }}</div>
            <div class="date">{{ post.date }}</div>
            <div class="main_main_card_content" v-html="post.body"></div>

            <div class="main_main_card_other_info_container">

              <div class="main_main_card_other_info_right"></div>
            </div>
            <div>
              <transition style="overflow: hidden" name="slide">
                <div
                  class="main_main_card_comment_input_container"
                  v-show="show"
                >
                  <div style="margin-left: 20px; margin-right: 20px">
                    <quillComponent
                      @update:content="handleContentChange"
                    ></quillComponent>
                  </div>
                </div>
              </transition>
              <div class="main_main_card_comment_operator_container">
                <button @click="comment">评论</button>
              </div>
            </div>
          </div>

          <commentCardVue
            v-for="item in comments"
            :comment="item"
            :key="item.id"
            @update:thumpUp="handleThumbUpChange"
            @update:thumpDown="handleThumbDownChange"
          ></commentCardVue>
        </div>
        <div class="main_container_rightMessage">
          <postMasterComponentVue
            :userInfo="post.userInfo"
          ></postMasterComponentVue>

          <div class="main_container_mainMessage_rightMessage_card">
            热门内容
            <popularPostComponent></popularPostComponent>
          </div>
          <div class="main_container_mainMessage_rightMessage_card">
            广告招租
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import { ref, reactive, inject, onMounted, watchEffect, getCurrentInstance} from "vue";
import commentCardVue from "../components/viewComponents/commentCard.vue";
import quillComponent from "../components/editPostComponents/quillComponent.vue";
import store from "../store";
import { useRouter } from "vue-router";
import { Post, UserInfo } from "@/types";
import { getUserInfo } from "../utils/userUtil.js";
import postMasterComponentVue from "../components/viewComponents/postMasterComponent.vue";
import popularPostComponent from "../components/viewComponents/popularPostComponent.vue";
import moment from "moment";

interface Comment {
  id: number;
  body: string;
  date: string;
  thumbUp: number;
  isLiked: number;
  userInfo: UserInfo;
}

export default {
  components: {
    commentCardVue,
    quillComponent,
    postMasterComponentVue,
    popularPostComponent,
  },
  name: "ViewPage",
  setup() {
    const show = ref(false);
    const newContent = ref("");
    const comments = reactive<Comment[]>([
    ]);
    const instance = getCurrentInstance();
    const proxy = instance?.proxy;

    const post = reactive<Post>({
      postId: 1,
      title: "寻找失落的提瓦特大陆",
      body: '<p>家人们谁懂啊，这个游戏一点都不好玩</p><img  src="https://tsundora.com/image/2020/10/genshin_3.jpg"></img><img src="https://tsundora.com/image/2020/10/genshin_3.jpg"></img><p>竟然有男角色</p><img src="https://tsundora.com/image/2020/10/genshin_3.jpg"></img>',
      date: "2022-12-12 12:12:12",
      likes: 121,
      isLiked: 0,
      userId: "1",
      type: "体育比赛",
      userInfo: {
        userName: "张三",
        avatar: "https://tsundora.com/image/2020/10/genshin_3.jpg",
        level: "4级",
        userId: "1",
        gender: "男",
        intro: "这是用户的信息",
        birth: "2022-12-12",
      },
    });
    const api: any = inject("$api");
    const router:any = inject("$router") as ReturnType<typeof useRouter>;
    let postId = router.currentRoute.value.params.id;
    function handleThumbUpChange({ id }: any) {
      let comment = getCommentById(id);
      if (comment != undefined) {
        if (comment.isLiked === 1) {
          comment.isLiked = 0;
        } else {
          comment.isLiked = 1;
        }
      }
    }

    

    const initial = () => {
      api.post.getPostByPostId({ postId: postId }).then((res: any) => {
        post.title = res.title;
        post.body = res.body;
        post.date = moment(res.createTime).format("YYYY-MM-DD HH:mm:ss");
        post.likes = res.likes;
        // post.isLiked = res.isLiked;
        post.isLiked = 0
        getUserInfo(res.userId).then((userInfo: any) => {
          userInfo.level = "4级";
          post.userInfo = userInfo;
        });

        console.log(post);
      }).catch((err: any) => {
        console.log(err);
      });
      api.post.getCommentsByPostId({ postId: postId }).then((res: any) => {
        let getComments = res.records;
        let promises = getComments.map((comment: any) => {
          return getUserInfo(comment.userId).then((userInfo: any) => {
            console.log("userInfo", userInfo);
            userInfo.level = "4级";
            comment.userInfo = userInfo;
            // 时间戳转格式化的字符串
            // comment.createTime = new Date(comment.createTime).toLocaleString();
          });
        });

        Promise.all(promises).then(() => {
          console.log("根据postId获取comments", comments);
          comments.length = 0
          comments.push(...getComments);
        });
      });
    };


    watchEffect(() => {
      postId = router.currentRoute.value.params.id;
      initial();
      // 在这里根据 id 获取新的 post 数据
    });

    onMounted(() => {
      if(!store.getters.getIsLogin){
        return
      }
      api.post.createHistory({ postId: postId }).then((res: any) => {
        console.log("createHistory", res);
      });
    });

    function handleThumbDownChange({ id }: any) {
      console.log("handleThumbDownChange", id);
    }

    function getCommentById(id: any) {
      return comments.find((item) => item.id === id);
    }

    function handleContentChange(newBody: any) {
      newContent.value = newBody;
    }

    function comment() {
      if (!store.getters.getIsLogin) {
        store.dispatch("SetShowLoginWindow", true);
        proxy!.$message.error("请先登录");
        return;
      }
      if (!show.value) {
        show.value = true;
        return;
      }
      if(newContent.value === ""){
        proxy!.$message.error("评论内容不能为空");
        return;
      }
      let newCommentForm = {
        body: newContent.value,
        postId: parseInt(postId),
        userId: store.getters.getUserInfo.userId
        // createTime: Date.now(),
      };

      api.comment.createComment(newCommentForm).then((res: any) => {
        console.log("commentId", res);
        api.comment
          .getCommentByCommentId({ commentId: res.value })
          .then((res: any) => {
            console.log("userId", res.userId);
            getUserInfo(res.userId).then((userInfo: any) => {
              userInfo.level = "4级";
              res.userInfo = userInfo;
              // res.createTime = new Date(res.createTime).toLocaleString();
              
              comments.push(res);
            });
          });
          show.value = false;
      });

      // 代理类转普通类
    }

    return {
      newContent,
      comments,
      post,
      handleThumbUpChange,
      handleThumbDownChange,
      getCommentById,
      handleContentChange,
      comment,
      show,
    };
  },
};
</script>
<style>
.main_container {
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: rgb(247, 248, 252);
  box-sizing: content-box;
}

.main_container::after {
  content: "";
  display: block;
  clear: both;
}

.main_container_message {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  padding-left: 100px;
  padding-right: 100px;
  background-color: transparent;
  box-sizing: content-box;
}

.main_container_mainMessage {
  width: 720px;
  height: 100%;
  background-color: transparent;
  float: left;
}

.main_container_rightMessage {
  width: 280px;
  height: 100%;
  background-color: transparent;
  float: right;
}

.main_container_mainMessage_rightMessage_card {
  width: 220px;
  height: auto;
  background-color: rgb(255, 255, 255);
  margin: 20px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 5px;
}

.main_container_mainMessage_rightMessage_card:hover {
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
}

.main_main_card {
  width: 100%;
  /* min-height: 300px; */
  background-color: rgb(255, 255, 255);
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid rgb(255, 255, 255);
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.main_main_card_title {
  line-height: 1.5em;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  font-weight: bold;
  background-color: transparent;
  font-size: 1.5em;
}

.main_main_card_content {
  line-height: 18px;
  margin-top: 8px;
  background-color: transparent;
  border-bottom: 1px solid rgb(211, 211, 211);
}

.main_main_card_content p {
  width: 100%;
  color: rgb(73, 73, 73);
  font-size: 1em;
  line-height: 1.5em; /* 添加行高以改善阅读体验 */
  margin: 10px 0 0;
  word-wrap: break-word;
  word-break: break-all;
  text-align: justify; /* 两端对齐可以使段落看起来更整齐 */
  padding: 0 15px; /* 添加内边距以防止文本贴近边缘 */
}

.main_main_card_content img {
  max-width: 80%;

  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.main_main_card_other_info_container {
  width: 100%;
  height: 20px;
  margin-top: 10px;
  background-color: transparent;
  align-items: center;
}

.main_main_card_other_info_left {
  width: 40%;
  height: 20px;
  background-color: transparent;
  align-items: center;
  float: left;
  font: 0.6em sans-serif;
}

.main_main_card_other_info_right {
  width: 40%;
  height: 20px;
  background-color: transparent;
  align-items: center;
  float: right;
}

.main_main_card_comment_input_container {
  width: 100%;
  min-height: 50px;
  background-color: transparent;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.main_main_card_comment_input {
  width: 100%;
  min-height: 120px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid rgb(162, 160, 160);
  border-radius: 5px;
  word-wrap: break-word;
  word-break: break-all;
  display: flex;
  margin-bottom: 10px;
}

.main_main_card_comment_operator_container {
  width: 100%;
  height: 35px;
  background-color: transparent;
}

.main_main_card_comment_operator_container_operator {
  width: 180px;
  height: 35px;
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 5px;
  float: left;
}

.main_main_card_comment_operator_container_operator img {
  width: 30px;
  height: 30px;
  margin: 2px 5px 0 2px;
  cursor: pointer;
}

.main_main_card_comment_operator_container_operator img:hover {
  background-color: rgb(71, 74, 88);
  border-radius: 5px;
}

.main_main_card_comment_operator_container button {
  width: 60px;
  height: 25px;
  background-color: rgb(31, 34, 51);
  color: white;
  border: none;
  border-radius: 5px;
  margin: 5px 20px 0 5px;
  float: right;
}

.post_master {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 60%;
  background-color: transparent;
  box-sizing: border-box;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 5px;
  margin: auto;
}

.popular_post {
  width: 100%;
  height: 100%;
  background-color: transparent;
  box-sizing: border-box;
  border: 1px solid rgb(190, 100, 100);
  border-radius: 5px;
  margin: 10px;
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.5s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 500px;
  /* 你需要根据实际情况调整这个值 */
}

.date{
  font-size: 0.8em;
  color: rgb(151, 151, 151);
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 10px;
  background-color: transparent;
}
</style>
