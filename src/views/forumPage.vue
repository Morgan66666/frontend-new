<template>
  <div class="main_container">
    <div class="main_container_message">
      <div class="main_container_mainMessage">
        <div class="searchBar-container">
          <input type="text" v-model="searchText" autocomplete="off" class="searchBar-input" />
          <button class="searchBar-button" @click="Search">搜索</button>
        </div>
        <div class="classified_search">
          <div class="classified_search_item">
            <div class="classified_search_item_label">板块</div>
            <a v-for="(item, index) in types" :key="index" @click="selectTypeOption(item)" v-bind:class="selectType === item ? 'classified_search_item_a_active' : ''
            ">
              {{ item }}
            </a>
          </div>
          <div class="classified_search_item">
            <div class="classified_search_item_label">时间</div>
            <a
              v-for="(item, index) in dates"
              :key="index"
              @click="selectDateOption(item)"
              :class="
                selectDate === item ? 'classified_search_item_a_active' : ''
              "
            >
              {{ item }}
            </a>
          </div>
          <div class="classified_search_item">
            <div class="classified_search_item_label">排序</div>
            <a v-for="(item, index) in temps" :key="index" @click="selectTempOption(item)" :class="selectTemp === item ? 'classified_search_item_a_active' : ''
            ">
              {{ item }}
            </a>
          </div>
        </div>
        <div class="post-container">
          <post-comment v-for="item in sortedComments" :comment="item" v-bind:key="item.id"
            @update:thumpUp="handleThumbUpChange" @update:thumpDown="handleThumbDownChange"></post-comment>
        </div>
      </div>
      <div class="main_container_rightMessage">
        <div class="announcement-edition">
          公告
          <div >希望有兴趣参加三人两足比赛的同学速速前往三甲医院进行不必要的肢体裁剪手术，逾期者取消参赛资格</div>
        </div>
        <div class="main_container_mainMessage_rightMessage_card">
          热门内容
            <popularPostComponent></popularPostComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, inject, computed } from "vue";
import postComment from "../components/homePageComponents/postComment.vue";
import SearchBar from "../components/SearchBar.vue";
import popularPostComponent from "../components/viewComponents/popularPostComponent.vue";
import store from '../store';

export default {
  components: { postComment, SearchBar,popularPostComponent },
  name: "forumPage",
  setup() {
    const api = inject("$api");
    const comments = ref([
    ]);
    const searchText = ref("");
    const types = ref(["体育", "电竞","艺术", "不限"]);
    const dates = ref(["今日", "一周内", "一月内", "不限"]);
    const temps = ref(["最新", "最热", "不限"]);
    const selectDate = ref("不限");
    const selectType = ref("不限");
    const selectTemp = ref("不限");

    onMounted( () => {
      console.log("comments", comments.value);
      try {
        //这个时间在后端是localDateTime类型
        let time = {
          "start-time": "2022-12-12T12:12:12",
          "end-time": "2025-12-12T12:12:12",
        }
        api.post.getPosts(time).then(res => {
          console.log("posts", res)
          res = res.records
          comments.value.push(...res);
        })
        
      } catch (error) {
        console.log('error', error);
      }
    });

    const filteredComments = computed(() => {
      console.log("comments过滤", comments.value);
      return comments.value.filter(
        (comment) => {
          if (selectType.value !== "不限" &&selectType.value !== comment.type) {
            return false;
          }

          let selectTimestamp;
          switch (selectDate.value) {
            case '今日':
              selectTimestamp = new Date().setHours(0, 0, 0, 0);
              break;
            case '一周内':
              selectTimestamp = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
              break;
            case '一月内':
              selectTimestamp = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
              break;
            default:
              selectTimestamp = null;
          }
          return !(selectTimestamp !== null && comment.createTime < selectTimestamp);
        }
      );
    });

    const sortedComments = computed(() => {
      console.log("comments排序", filteredComments.value);
      if (selectTemp.value === "最热") {
        return filteredComments.value.sort((a, b) => b.likes - a.likes);
      }
      if (selectTemp.value === "最新") {
        return filteredComments.value.sort((a, b) => a.createTime - b.createTime);
      }
      return filteredComments.value;

    });

    const selectDateOption = (option) => {
      selectDate.value = option;
    };

    const selectTypeOption = (option) => {
      selectType.value = option;
    };

    const selectTempOption = (option) => {
      selectTemp.value = option;
    };

    const handleThumbUpChange = ({ id, likes }) => {
      let post = getPostById(id);
      if (post != null) {
        post.likes = likes;
      }
      console.log("post", post);
    };

    const handleThumbDownChange = ({ id }) => {
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
      console.log("post", post);
    };

    const getPostById = (id) => {
      return comments.value.find((item) => item.postId === id);
    };

    const Search = () => {
      if (searchText.value === "") {
        return;
      }
      let searchForm = {
        title: searchText.value,
        // body: searchText.value,
      };

      api.post.getPosts(searchForm).then((res) => {
        console.log(res);
        comments.value = res.records;
      });

      console.log(searchText.value);
    };
    watch(
      comments,
      (newComments) => {
        console.log("Comments have changed:", newComments);
      },
      { deep: true }
    );

    return {
      comments,
      types,
      dates,
      temps,
      selectDate,
      selectType,
      selectTemp,
      selectDateOption,
      selectTypeOption,
      selectTempOption,
      handleThumbUpChange,
      handleThumbDownChange,
      getPostById,
      Search,
      searchText,
      filteredComments,
      sortedComments,
      store
    };
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
  border-radius: 5px;
  overflow: hidden;
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

.post-container {
  width: 100%;
  height: auto;
  background-color: transparent;
  border-radius: 5px;
  overflow: hidden;
}

.main_container {
  width: 100%;
  height: auto;
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
  background-color: transparent;
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
  padding: 10px 10px;
  box-sizing: border-box;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 5px;
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

.searchBar-container {
  width: 100%;
  height: 50px;
  display: flex;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(200, 200, 200);
  margin-bottom: 20px;
  border-radius: 5px;
  overflow: hidden;
}

.searchBar-input {
  display: inline-block;
  height: 100%;
  border: none;
  padding: 0 30px;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  outline: none;
}

.searchBar-button {
  display: inline-block;
  height: 100%;
  width: 120px;
  background-color: rgb(254, 231, 50);
  color: rgb(106, 61, 0);
  border: none;
  cursor: pointer;
}

.searchBar-button:hover {
  background-color: rgb(249, 228, 64);
  color: rgb(106, 61, 0);
}

.announcement-edition{
  padding: 20px;
  margin: 20px;
  width: 180px;
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
}
.announcement-edition div {
  margin-top: 10px;
  font-size: 16px;
  color: #666;
}
</style>
