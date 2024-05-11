<template>
  <div>
    <div class="main_container_user_title">
        <a>其他</a>
        <div style="height: 6px;"></div>
        
        <postComment v-for="item in postsShow" :comment="item" v-bind:key="item.id"></postComment>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted} from 'vue'
import { useRouter } from 'vue-router';
import { Post } from '../../types'
import postComment from '../homePageComponents/postComment.vue'

const props = defineProps({
  userId: String,
});

const api:any = inject('$api');
let postsShow = ref<Post[]>([
        {
          id: 1,
          title: "寻找失落的提瓦特大陆",
          body: '<p>家人们谁懂啊，这个游戏一点都不好玩</p><img src="https://tsundora.com/image/2020/10/genshin_3.jpg"></img><img src="https://tsundora.com/image/2020/10/genshin_3.jpg"></img><img src="https://tsundora.com/image/2020/10/genshin_3.jpg"></img>',
          date: "2022-12-12 12:12:12",
          thumbUp: 121,
          isLiked: 0,
          userInfo: {
            avatar: "https://tsundora.com/image/2020/10/genshin_3.jpg",
            username: "张三",
            level: "4级",
            userId: "12110112",
            userMassage: "这是用户的信息",
            birth: "2022-12-12",
          },
        },
        {
          id: 1,
          title: "寻找失落的提瓦特大陆",
          body: '<p>家人们谁懂啊，这个游戏一点都不好玩</p><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img>',
          date: "2022-12-12 12:12:12",
          thumbUp: 121,
          isLiked: 0,
          userInfo: {
            avatar: "https://tsundora.com/image/2020/10/genshin_3.jpg",
            username: "张三",
            level: "4级",
            userId: "12110112",
            userMassage: "这是用户的信息",
            birth: "2022-12-12",
          },
        },
        {
          id: 1,
          title: "寻找失落的提瓦特大陆",
          body: '<p>家人们谁懂啊，这个游戏一点都不好玩</p><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img>',
          date: "2022-12-12 12:12:12",
          thumbUp: 121,
          isLiked: 0,
          userInfo: {
            avatar: "https://tsundora.com/image/2020/10/genshin_3.jpg",
            username: "张三",
            level: "4级",
            userId: "12110112",
            userMassage: "这是用户的信息",
            birth: "2022-12-12",
          },
        },
      ])
let page = ref(1);
let pageSize = ref(10);
let pageTotal = ref(1);
let router = useRouter();

onMounted(() => {
  api.post.getPostsByUserId({userId: props.userId}).then((res: any) => {
    Object.assign(postsShow, res);
  });
})

</script>


<style scoped>

.main_container_user_title{
    width: auto;
    height: 30px;
    background-color: transparent;
    margin-top: 10px; 
    border-bottom: 1px solid rgb(75, 78, 94);
}

.main_container_user_title a{
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
  transition: background-color .3s;
}

div.center {
  text-align: center;
  width: 100%;
}

</style>
