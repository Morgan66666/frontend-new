<template>
  <div>
    <div class="main_container">
      <div class="main_container_message">
        <div class="main_container_mainMessage">
          
          <post-comment
            v-for="item in comments"
            :comment="item"
            v-bind:key="item.id"
            @update:thumpUp="handleThumbUpChange"
            @update:thumpDown="handleThumbDownChange"
          ></post-comment>
        </div>
        <div class="main_container_rightMessage">
          <div class="main_container_mainMessage_rightMessage_card">
            <div>
              <button class="right_op_button" >
                <router-link to="/post-edit" class="nav_link" :class="{ active: $route.path.startsWith('/post-edit') }">发帖</router-link>

                </button>
            </div>
            <div>
              <button class="right_op_button">聊天</button>
            </div>
            <div>
              <button class="right_op_button">AI帮助</button>
            </div>

          </div>
          <div class="main_container_mainMessage_rightMessage_card">2</div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import postComment from "../components/homePageComponents/postComment.vue";

export default {
  components: { postComment },
  name: "HomePage",
  data() {
    return {
      comments: [
        {
          id: "1",
          title: "寻找失落的提瓦特大陆",
          content: "家人们谁懂啊，这个游戏一点都不好玩",
          img: [`imgUrl ? imgUrl : require('../../assets/霍霍果照片.png')`],
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
          content: "",
          img: [`imgUrl ? imgUrl : require('../../assets/霍霍果照片.png')`],
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
          content: "",
          img: [`imgUrl ? imgUrl : require('../../assets/霍霍果照片.png')`],
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
    };
  },
  methods: {
    // 向服务器获取帖子数据，将数据转换成commens的格式
    getPostData() {
      // 获取帖子数据
    },
    //转换格式, 把原始的post转成comments，主要区别在于图片，comments的图片是将post的img标签提取出来
    convertData() {
      // 转换数据格式
    },
    handleThumbUpChange({id}) {
      let post = this.getPostById(id);
      if (post != null) {
        //如果点过踩
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
    },

    handleThumbDownChange({id}) {
      let post = this.getPostById(id);
      if (post != null) {
        //如果点过赞
        if (post.isLiked === 1) {
          let thumbUp = post.thumbUp - 1;
          post.isLiked = -1;
          post.thumbUp = thumbUp;
        } else {
          post.isLiked = post.isLiked === -1 ? 0 : -1;
        }
      }
      console.log('post', post);
    },

    getPostById(id) {
      // 根据id获取帖子
        return this.comments.find(item => item.id === id);
    },

  },
  mounted() {
    // Your mounted hook code here
  },

  
  watch: {
        comments: {
          handler(newComments) {
            // Handle the changes in the comments array here
            console.log('Comments have changed:', newComments);
          },
          deep: true, // Enable deep watching for nested changes
        },
      },
};
</script>

<style scoped>
.main_container {
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  box-sizing: content-box;
}
.main_container_message {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  padding-left: 100px;
  padding-right: 100px;
  background-color: rgb(255, 255, 255);
  box-sizing: content-box;
}
.main_container_mainMessage {
  width: 720px;
  height: 100%;
  background-color: rgb(92, 82, 82);
  display: inline_block;
  float: left;
  margin: 20px 0 0 0;
}
.main_container_rightMessage {
  width: 280px;
  height: 100%;
  background-color: rgb(255, 255, 255);
  float: right;
  display: inline_block;
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
  border: 1px solid rgb(200, 200, 200);
  border-radius: 5px;
  text-align: center;  
  align-content: center;
}

.main_container_mainMessage_rightMessage_card:hover {
  background-color: rgb(235, 195, 195);
  border-radius: 5px;
}

.right_op_button{
  width: 100px;
  height: 30px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(200, 200, 200);
  border-radius: 5px;
  text-align: center;
  align-content: center;
  margin: 10px;
}
</style>
