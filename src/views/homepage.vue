<template>
  <div>
    <div class="main_container">
      <div class="main_container_message">

        <div class="main_container_mainMessage">

          <v-carousel class="carousel" cycle height="440" width="800" hide-delimiters :show-arrows="false">
            <v-carousel-item v-for="image in activities" :key="image.img" :src="image.img" @click="goToActivity(image.activityId)"  class="clickable-image"></v-carousel-item>
          </v-carousel>

          <post-comment-component v-for="item in comments" :comment="item" v-bind:key="item.postId"
            @update:thumpUp="handleThumbUpChange" @update:thumpDown="handleThumbDownChange"></post-comment-component>
        </div>
        <div class="main_container_rightMessage">
          <div class="main_container_mainMessage_rightMessage_card">
            <div>

              <router-link to="/post-edit" style="text-decoration: none;" class="btn-24"
                :class="{ active: $route.path.startsWith('/post-edit') }">发帖</router-link>
            </div>
            <div>
              <button class="btn-24" @click="store.dispatch('SetShowChatWindow', true)">聊天</button>
            </div>
            <div>
              <button class="btn-24" @click="toAI">A I</button>
            </div>

          </div>
          <div class="main_container_mainMessage_rightMessage_card">
            <img
              src="https://ts4.cn.mm.bing.net/th?id=OIP-C.jpOTpQl-fzreeiqXA9bNQAHaH_&w=240&h=259&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
              alt="">

          </div>

        </div>
      </div>
    </div>

    <div class="chat" v-if="chatVisible">
      <chat-component></chat-component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive,onUnmounted } from 'vue';
import PostCommentComponent from "../components/homePageComponents/postComment.vue";
import chatComponent from '../components/chatComponent.vue';
import { Post, ActivityDetail } from '@/types';
import { inject,onMounted } from 'vue';
import store from '../store';
import router from "@/router";

const api:any = inject('$api');
let comments = reactive<Post[]>([]);
let activities = ref<ActivityDetail[]>([]);

let pageNum = 1
let pageSize = 4
let chatVisible = ref(false);
onMounted(async () => {
  window.addEventListener('scroll', handleScroll);
  try {
    let postTime = {
      "start-time": "2022-12-12T12:12:12",
      "end-time": "2025-12-12T12:12:12",
      "pageNum": pageNum,
      "pageSize":pageSize
    }
    let postRes = await api.post.getPosts(postTime);
    comments.push(...postRes.records);

    let form = {
      pageSize: 3,
      pageNum: 1
    }
    let activityRes = await api.activity.getActivities(form);
    if (activityRes.code == undefined) {
      activities.value = activityRes.records;
      console.log("activities", activities.value)
    } else {
      console.log(activityRes);
    }
  } catch (error) {
    console.log('error', error);
  }
});

function toAI() {
  router.push('/ai');
}

function goToActivity(activityId: number) {
  router.push({ path: '/activity', query: { activityId } });
}

const handleScroll = async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 1) {
    console.log('滚动到底部了');

    try {
        let time = {
          "start-time": "2022-12-12T12:12:12",
          "end-time": "2025-12-12T12:12:12",
          "pageNum": ++pageNum,
          "pageSize": pageSize
        }
        let res = await api.post.getPosts(time);
        comments.push(...res.records);
      } catch (error) {
        console.log('error', error);
      }
  }
};

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleThumbUpChange = ({ id }:any) => {
  let post = getPostById(id);
  if (post != null) {
    if (post.isLiked === -1) {
      let likes = post.likes + 1;
      post.isLiked = 1;
      post.likes = likes;
    } else {
      let likes = post.isLiked === 1 ? post.likes - 1 : post.likes + 1;
      post.isLiked = post.isLiked === 1 ? 0 : 1;
      post.likes = likes;
    }
  }
  console.log('post', post);
};

const handleThumbDownChange = ({ id }:any) => {
  let post = getPostById(id);
  if (post != null) {
    if (post.isLiked === 1) {
      let likes = post.likes - 1;
      post.isLiked = -1;
      post.likes = likes;
    } else {
      post.isLiked = post.isLiked === -1 ? 0 : -1;
    }
  }
  console.log('post', post);
};

const getPostById = (id:any) => {
  return comments.find(item => item.postId === id);
};

watch(comments, (newComments) => {
  console.log('Comments have changed:', newComments);
}, { deep: true });
</script>


<style scoped>
.main_container {
  width: 100%;
  height: 100vh;
  justify-content: center;
  background-color: rgb(247, 248, 252);
  box-sizing: content-box;
}

.main_container_message {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  padding-left: 100px;
  padding-right: 100px;
  background-color: rgb(247, 248, 252);
  box-sizing: content-box;
  border-radius: 5px;
}

.main_container::after {
  content: "";
  display: table;
  clear: both;
}

.main_container_mainMessage {
  width: 720px;
  height: 100%;
  background-color: rgb(247, 248, 252);
  display: inline-block;
  float: left;
  margin: 20px 0 0 0;
}

.main_container_rightMessage {
  width: 280px;
  height: 100%;
  background-color: transparent;
  float: right;
  display: inline-block;
  margin: 20px 0 0 0;
}

.main_container_mainMessage_rightMessage_card {
  width: 220px;
  height: auto;
  background-color: rgb(255, 255, 255);
  margin: 20px;
  padding: 60px 10px;
  box-sizing: border-box;
  border-radius: 5px;
  text-align: center;
  align-content: center;
}

.main_container_mainMessage_rightMessage_card img {
  margin: auto;
  width: 90%;
}



.right_op_button {
  width: 100px;
  height: 30px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(200, 200, 200);
  border-radius: 5px;
  text-align: center;
  align-content: center;
  margin: 10px;
}

.right_nav_link {
  color: black;
  text-decoration: none;
}

/* 按钮样式 */
.btn-24,
.btn-24 *,
.btn-24 :after,
.btn-24 :before,
.btn-24:after,
.btn-24:before {
  border: 0 solid;
  box-sizing: border-box;
}

.btn-24 {
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: button;
  background-color: #000;
  background-image: none;
  color: #fff;
  cursor: pointer;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-size: 100%;
  font-weight: 900;
  line-height: 1.5;
  margin: 0;
  -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
  padding: 0;
  border-radius: 0.375rem;
  text-transform: uppercase;
}

.btn-24:disabled {
  cursor: default;
}

.btn-24:-moz-focusring {
  outline: auto;
}

.btn-24 svg {
  display: block;
  vertical-align: middle;
}

.btn-24 [hidden] {
  display: none;
}

.btn-24 {
  --background: rgb(255, 231, 51);
  background: none;
  overflow: hidden;
  padding: 0.8rem 3rem;
  position: relative;
  width: 150px;
  margin-top: 20px;
  color: rgb(102, 60, 0);
}

.btn-24 span {
  display: block;
  position: relative;
  transition: transform 0.2s ease;
}

.btn-24:after,
.btn-24:before {
  --tilt: 20px;
  background: #636262;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%);
  content: "";
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: -webkit-clip-path 0.2s ease;
  transition: clip-path 0.2s ease, -webkit-clip-path 0.2s ease;
  width: 100%;
  z-index: -1;
}

.btn-24:after {
  --thickness: 5px;
  background: var(--background);
  height: calc(100% - var(--thickness) * 2);
  left: var(--thickness);
  top: var(--thickness);
  width: calc(100% - var(--thickness) * 2);
}

.btn-24:hover span {
  transform: translateX(-20px);
}

.btn-24:hover:after,
.btn-24:hover:before {
  -webkit-clip-path: polygon(0 0,
      calc(100% - var(--tilt)) 0,
      100% 50%,
      calc(100% - var(--tilt)) 100%,
      0 100%);
  clip-path: polygon(0 0,
      calc(100% - var(--tilt)) 0,
      100% 50%,
      calc(100% - var(--tilt)) 100%,
      0 100%);
}

.carousel {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  margin-bottom: 50px;
}
.clickable-image {
  cursor: pointer;
}
</style>
