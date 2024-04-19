<template>
  <div class="main_container">
    <div class="main_container_message">
      <div class="main_container_mainMessage">
        <div class="classified_search">
          <div class="classified_search_item">
            <div class="classified_search_item_label">板块</div>
            <a
              v-for="(item, index) in types"
              :key="index"
              @click="selectTypeOption(item)"
              v-bind:class="selectType == item ? 'classified_search_item_a_active' : ''"
            >
              {{ item }}
            </a>
          </div>
          <div class="classified_search_item">
            <div class="classified_search_item_label">时间</div>
            <a
              v-for="(item, index) in dates"
              :key="index"
              @click="selectDateOption(item)"
              :class="selectDate == item ? 'classified_search_item_a_active' : ''"
            >
              {{ item }}
            </a>
          </div>
          <div class="classified_search_item">
            <div class="classified_search_item_label">排序</div>
            <a
              v-for="(item, index) in temps"
              :key="index"
              @click="selectTempOption(item)"
              :class="selectTemp == item ? 'classified_search_item_a_active' : ''"
            >
              {{ item }}
            </a>
          </div>
        </div>

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
            <button class="right_op_button">
              <router-link
                to="/post-edit"
                class="right_nav_link"
                :class="{ active: $route.path.startsWith('/post-edit') }"
                >发帖</router-link
              >
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
</template>

<script>
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
          content:
            '<p>家人们谁懂啊，这个游戏一点都不好玩</p><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img>',
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
          content:
            '<p>家人们谁懂啊，这个游戏一点都不好玩</p><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img>',
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
          content:
            '<p>家人们谁懂啊，这个游戏一点都不好玩</p><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img><img src="src/assets/霍霍果照片.png"></img>',
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
      //板块
      types: ["游戏", "运动", "不限"],
      //时间
      dates: ["今日", "一周内", "一月内", "不限"],
      //排序
      temps: [  "最新", "最热",'不限'],
      selectDate: "不限",
      selectType: "不限",
      selectTemp: "不限",
    };
  },
  methods: {
    selectDateOption(option) {
      this.selectDate = option;
    },
    selectTypeOption(option) {
      this.selectType = option;
    },
    selectTempOption(option) {
      this.selectTemp = option;
    },

    handleThumbUpChange({ id }) {
      let post = this.getPostById(id);
      if (post != null) {
        //如果点过踩
        if (post.isLiked === -1) {
          let thumbUp = post.thumbUp + 1;
          post.isLiked = 1;
          post.thumbUp = thumbUp;
        } else {
          let thumbUp =
            post.isLiked === 1 ? post.thumbUp - 1 : post.thumbUp + 1;
          post.isLiked = post.isLiked === 1 ? 0 : 1;
          post.thumbUp = thumbUp;
        }
      }
      console.log("post", post);
    },

    handleThumbDownChange({ id }) {
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
      console.log("post", post);
    },

    getCommentByFlags() {

    },

    getPostById(id) {
      // 根据id获取帖子
      return this.comments.find((item) => item.id === id);
    },
  },
  mounted() {
    // Your mounted hook code here
  },

  watch: {
    comments: {
      handler(newComments) {
        // Handle the changes in the comments array here
        console.log("Comments have changed:", newComments);
      },
      deep: true, // Enable deep watching for nested changes
    },
  },
};
</script>


<style scoped>
.classified_search {
  width: 100%;
  height: 200px;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(200, 200, 200);
  margin-bottom: 20px;
  margin-top: 20px;
}

.classified_search_item {
  height: 50px;
  width: calc(100% - 40px);
  margin-top: 15px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: transparent;
  align-items: center;
  display: flex;
  border-bottom: 1px solid rgb(200, 200, 200);
}

.classified_search_item a {
  height: 34px;
  width: 44px;
  margin-left: 10px;
  font-size: 0.8rem;
  cursor: pointer;
  text-align: center;
  line-height: 34px;
}

.classified_search_item a:hover {
  background-color: rgb(224, 223, 234);
  border-radius: 5px;
}

.classified_search_item_a_active {

  border-radius: 5px;
  color: rgb(0, 0, 0);
  background-color: rgb(210, 209, 216);
}

.classified_search_item_label {
  height: 100%;
  width: auto;
  margin-left: 10px;
  background-color: transparent;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
}

.main_container {
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: rgb(247,248,252);
  box-sizing: content-box;
}
.main_container_message {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  padding-left: 100px;
  padding-right: 100px;
  background-color: rgb(247,248,252);
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
  background-color: transparent;
  display: inline_block;
  float: left;
  margin: 20px 0 0 0;
}
.main_container_rightMessage {
  width: 280px;
  height: 100%;
  background-color: transparent;
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

.right_op_button:hover {
  background-color: rgb(224, 223, 234);
  border-radius: 5px;
}

.right_nav_link {
  color: black;
  text-decoration: none;
}
</style>
