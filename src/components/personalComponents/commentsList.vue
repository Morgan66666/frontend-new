<template>
  <div>
    <div class="main_container_user_title">
        <a>其他</a>
        <div style="height: 6px;"></div>
        
        <postComment v-for="item in commentsShow" :comment="item" v-bind:key="item.id"></postComment>
      
    </div>
  </div>
</template>

<script lang="ts">
import postComment from '../homePageComponents/postComment.vue'
import {PropType} from "vue";

export default {
  name: 'CommentsList',
  // Your component options here
    components: { postComment: postComment },
    props: {
        userId: {
            type: String as PropType<string>,
        },
    },
  data() {
    return {

    commentsShow: [
        {
          id: "1",
          title: "寻找失落的提瓦特大陆",
          content: '<p>家人们谁懂啊，这个游戏一点都不好玩</p><img src="https://tsundora.com/image/2020/10/genshin_3.jpg"></img><img src="https://tsundora.com/image/2020/10/genshin_3.jpg"></img><img src="https://tsundora.com/image/2020/10/genshin_3.jpg"></img>',
          date: "2022-12-12 12:12:12",
          thumbUp: 121,
          isLiked: 0,
          userInfo: {
            username: "张三",
            level: "4级",
            userId: "12110112",
            userMassage: "这是用户的信息",
          },
        },
        {
          id: "2",
          title: "寻找失落的提瓦特大陆",
          content: '<p>家人们谁懂啊，这个游戏一点都不好玩</p><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img>',
          date: "2022-12-12 12:12:12",
          thumbUp: 121,
          isLiked: 0,
          userInfo: {
            username: "张三",
            level: "4级",
            userId: "12110112",
            userMassage: "这是用户的信息",
          },
        },
        {
          id: "3",
          title: "寻找失落的提瓦特大陆",
          content: '<p>家人们谁懂啊，这个游戏一点都不好玩</p><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img>',
          date: "2022-12-12 12:12:12",
          thumbUp: 121,
          isLiked: 0,
          userInfo: {
            username: "张三",
            level: "4级",
            userId: "12110112",
            userMassage: "这是用户的信息",
          },
        },
      ],
    page: 1,
    pageSize: 10,
    pageTotal: 1,
    };
  },


  methods: {
  },

  mounted() {
    // 在这里发送一个请求，获取用户的评论

  },
}
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
