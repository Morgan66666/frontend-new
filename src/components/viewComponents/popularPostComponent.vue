<template>
  <div class="post_master">
    <div
      v-for="(item, index) in postList"
      :key="index"
      class="post_master_item"
    >
      <img class="post_master_item_img" :src="item.userInfo.avatar" alt="" />
      <div class="post_master_item_title" @click="jumpToPost(item.postId)">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>




<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Post } from "@/types";

let postList = ref<Post[]>([]);
  const router = inject("$router") as ReturnType<typeof useRouter>;
const api: any = inject("$api");

onMounted(() => {
  // api.post.getPopularPost().then((res: any) => {
  //   postList.value = res.data;
  // });
  api.post.getSortedPostsByLike({pageNum:1,pageSize:5}).then((res: any) => {
    Promise.all(
      res.records.map((item: { userId: any; userInfo: any }) => {
        
        return api.user.getUserInfoByUserId({userId:item.userId}).then((res: any) => {
          console.log(item);
          item.userInfo = res;
          return item;
        });
      })
    ).then((records) => {
      console.log("获取popularPost成功", records);
      postList.value = records;
    });
  });
});

let jumpToPost = (id: number) => {
  console.log(id);
router.push({ path: `/post/${id}` });
};
</script>

<style scoped>
.post_master_avatar {
  width: 50px;
  height: 50px;
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  margin: auto;
}

.post_master_username {
  width: 100%;
  height: 20px;
  background-color: transparent;
  font-size: 1em;
  font-weight: bold;
  margin: auto;
  text-align: center;
}

.post_master_level {
  width: 60px;
  height: 20px;
  background-color: rgb(255, 191, 0);
  font-size: 0.8em;
  margin: 10px;
  text-align: center;
  border-radius: 5px;
}

.post_master_item {
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  margin: 10px;
  border-radius: 10px;
  display: flex;
}

.post_master_item_title {
  width: 120px;
  height: 30px;
  background-color: rgb(255, 255, 255);
  font-size: 0.8em;
  line-height: 30px;
  color: rgb(73, 73, 73);
  margin-left: 7px;
  overflow: hidden; /* 隐藏超出元素宽度的内容 */
  text-overflow: ellipsis; /* 将溢出的文本显示为省略号 (...) */
  white-space: nowrap; /* 防止文本换行 */
  font-family: Arial, sans-serif;
}

.post_master_item_title:hover {
  color: #1a73e8;
  cursor: pointer;
}

.post_master_item_img {
  width: 30px;
  height: 30px;
  background-color: rgb(249, 237, 237);
  font-size: 0.8em;
  border-radius: 5px;
}
</style>