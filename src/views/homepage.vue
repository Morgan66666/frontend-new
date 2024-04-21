<template>
  <div>
    <div class="main_container">
      <div class="main_container_message">

        <div class="main_container_mainMessage">

          <v-carousel class="carousel" cycle height="500" hide-delimiters :show-arrows="false">
            <v-carousel-item v-for="image in images" :key="image" :src="image"></v-carousel-item>
          </v-carousel>

          <post-comment-component v-for="item in comments" :comment="item" v-bind:key="item.id"
            @update:thumpUp="handleThumbUpChange" @update:thumpDown="handleThumbDownChange"></post-comment-component>
        </div>
        <div class="main_container_rightMessage">
          <div class="main_container_mainMessage_rightMessage_card">
            <div>

              <router-link to="/post-edit" style="text-decoration: none;" class="btn-24"
                :class="{ active: $route.path.startsWith('/post-edit') }">发帖</router-link>


            </div>
            <div>
              <button class="btn-24">聊天</button>
            </div>
            <div>
              <button class="btn-24">A I</button>
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
  </div>
</template>




<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import PostCommentComponent from "../components/homePageComponents/postComment.vue";
import { Post } from '../types';

const comments = reactive<Post[]>([
  {
    id: 1,
    title: "寻找失落的提瓦特大陆",
    content: '<p>家人们谁懂啊，这个游戏一点都不好玩</p><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img>',
    date: "2022-12-12 12:12:12",
    thumbUp: 121,
    isLiked: 0,
    userInfo: {
      avatar: "https://ts4.cn.mm.bing.net/th?id=OIP-C.jpOTpQl-fzreeiqXA9bNQAHaH_&w=240&h=259&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      username: "张三",
      level: "4级",
      userId: "12110112",
      userMassage: "这是用户的信息",
    },
  },
  {
    id: 2,
    title: "寻找失落的提瓦特大陆",
    content: '<p>家人们谁懂啊，这个游戏一点都不好玩</p><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img>',
    date: "2022-12-12 12:12:12",
    thumbUp: 121,
    isLiked: 0,
    userInfo: {
      avatar: "https://ts4.cn.mm.bing.net/th?id=OIP-C.jpOTpQl-fzreeiqXA9bNQAHaH_&w=240&h=259&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      username: "张三",
      level: "4级",
      userId: "121101142",
      userMassage: "这是用户的信息",
    },
  },
  {
    id: 3,
    title: "寻找失落的提瓦特大陆",
    content: '<p>家人们谁懂啊，这个游戏一点都不好玩</p><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img>',
    date: "2022-12-12 12:12:12",
    thumbUp: 121,
    isLiked: 0,
    userInfo: {
      avatar: "https://ts4.cn.mm.bing.net/th?id=OIP-C.jpOTpQl-fzreeiqXA9bNQAHaH_&w=240&h=259&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
      username: "张三",
      level: "4级",
      userId: "121101152",
      userMassage: "这是用户的信息",
    },
  },

]);

const images = ref([
  "https://ts4.cn.mm.bing.net/th?id=OIP-C.jpOTpQl-fzreeiqXA9bNQAHaH_&w=240&h=259&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  "https://ts4.cn.mm.bing.net/th?id=OIP-C.jpOTpQl-fzreeiqXA9bNQAHaH_&w=240&h=259&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  "https://ts4.cn.mm.bing.net/th?id=OIP-C.jpOTpQl-fzreeiqXA9bNQAHaH_&w=240&h=259&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
]);

const handleThumbUpChange = ({ id }) => {
  let post = getPostById(id);
  if (post != null) {
    if (post.isLiked === -1) {
      let thumbUp = post.thumbUp + 1;
      post.isLiked = 1;
      post.thumbUp = thumbUp;
    } else {
      let thumbUp = post.isLiked === 1 ? post.thumbUp - 1 : post.thumbUp + 1;
      post.isLiked = post.isLiked === 1 ? 0 : 1;
      post.thumbUp = thumbUp;
    }
  }
  console.log('post', post);
};

const handleThumbDownChange = ({ id }) => {
  let post = getPostById(id);
  if (post != null) {
    if (post.isLiked === 1) {
      let thumbUp = post.thumbUp - 1;
      post.isLiked = -1;
      post.thumbUp = thumbUp;
    } else {
      post.isLiked = post.isLiked === -1 ? 0 : -1;
    }
  }
  console.log('post', post);
};

const getPostById = (id) => {
  return comments.find(item => item.id === id);
};

watch(comments, (newComments) => {
  console.log('Comments have changed:', newComments);
}, { deep: true });

</script>


<style scoped>
.main_container {
  width: 100%;
  height: 100%;
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
  padding: 10px;
  padding-top: 60px;
  padding-bottom: 60px;
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
  transition: clip-path 0.2s ease;
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
  width: 90%;
  height: auto;
  margin: auto;
  margin-bottom: 50px;
}
</style>
