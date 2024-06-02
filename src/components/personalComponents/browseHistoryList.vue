<template>
  <div>
    <div class="main_container_user_title">
      <a>浏览记录</a>
      <div style="height: 6px"></div>
      <div class="browseList">
        <div class="item" v-for="(item, index) in postsShow" :key="index">
          <img
            v-show="!item.show"
            class="avatar"
            :src="item.userInfo.avatar"
            alt=""
            onerror="https://th.bing.com/th/id/OIP.akEXjXSun7zbVDGMJUegdgHaHa?rs=1&pid=ImgDetMain"
          />
          <button class="content" @click="item.show = !item.show">
            {{ item.postInfo.title }}
          </button>

          <div class="time">
            浏览时间: {{ formatDate(item.postInfo.createTime) }}
          </div>

          <transition name="slide-fade">
            <postComment v-if="item.show" :comment="item"></postComment>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import postComment from "../homePageComponents/postComment.vue";
import moment from 'moment';

const api: any = inject("$api");
let postsShow = ref<any>([]);
const router: any = inject("$router") as ReturnType<typeof useRouter>;
const userId = router.currentRoute.value.params.userId;
const showComment = {};

const formatDate = (value:any) => {
      if (value) {
      
        return moment(value).format("YYYY-MM-DD HH:mm:ss");
      }
    }

onMounted(() => {
  api.post.getHistoryByUserId({ userId: userId }).then((res: any) => {
    // 根据拿到的收藏记录获取帖子
    Promise.all(
      res.records.map((item: { postId: any; postInfo: any }) => {
        return api.post
          .getPostByPostId({ postId: item.postId })
          .then((res: any) => {
            item.postInfo = res;
            return item;
          });
      })
    ).then((records) => {
      Promise.all(
        records.map((item: { userId: any; userInfo: any; show: boolean }) => {
          return api.user
            .getUserInfoByUserId({ userId: item.userId })
            .then((res: any) => {
              item.userInfo = res;
              item.show = false;
              return item;
            });
        })
      ).then((records) => {
        console.log("获取收藏帖子成功", records);
        postsShow.value = records;
      });
    });
  });
});
</script>


<style scoped>
.main_container_user_title {
  width: auto;
  height: 30px;
  background-color: transparent;
  margin-top: 10px;
  border-bottom: 1px solid rgb(75, 78, 94);
}

.main_container_user_title a {
  color: rgb(0, 0, 0);
  text-decoration: none;
  height: 0.5em;
  text-align: center;
  display: inline-block;
  margin-left: 10px;
  margin-bottom: 10px;
  line-height: 0.5em;
}

ul.pagination li a {
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 0 4px;
  transition: background-color 0.3s;
}

div.center {
  text-align: center;
  width: 100%;
}

.browseList {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.browseList .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.browseList .item .avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.browseList .item .content {
  flex-grow: 1;
}

.browseList .item .time {
  color: #666;
  margin-top: 1px;
  font: 12px sans-serif;
}

.browseList .item .content .title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.browseList .item .content .description {
  color: #666;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform-origin: top;
  transform: scaleY(0);
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  transform-origin: top;
  transform: scaleY(1);
}
</style>
