<template>
  <div class="main_container">
    
    <div class="main_container_message">
      <div class="main_container_mainMessage">
        <div class="searchBar-container">
          <input type="text" v-model="searchText" autocomplete="off" class="searchBar-input">
          <button class="searchBar-button" @click="Search">搜索</button>
        </div>
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
        <div class="post-container">
                  <post-comment
            v-for="item in comments"
            :comment="item"
            v-bind:key="item.id"
            @update:thumpUp="handleThumbUpChange"
            @update:thumpDown="handleThumbDownChange"
        ></post-comment>
        </div>

      </div>
      <div class="main_container_rightMessage">
        <div class="main_container_mainMessage_rightMessage_card">
          <div>

            <router-link
                to="/post-edit"
                class="btn-24"
                :class="{ active: $route.path.startsWith('/post-edit') }"
            >发帖</router-link
            >

          </div>
          <div>
            <button class="btn-24">聊天</button>
          </div>
          <div>
            <button class="btn-24">A I</button>
          </div>
        </div>
        <div class="main_container_mainMessage_rightMessage_card">2</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch, onMounted } from 'vue';
import postComment from "../components/homePageComponents/postComment.vue";
import SearchBar from "../components/SearchBar.vue";

export default {
  components: { postComment, SearchBar},
  name: "HomePage",
  setup() {
    const comments = ref([
        {
          id: "1",
          title: "寻找失落的提瓦特大陆",
          body:
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
          body:
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
          body:
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
      ]);
    
    const searchText = ref("");  
    const types = ref(["游戏", "运动", "不限"]);
    const dates = ref(["今日", "一周内", "一月内", "不限"]);
    const temps = ref(["最新", "最热",'不限']);
    const selectDate = ref("不限");
    const selectType = ref("不限");
    const selectTemp = ref("不限");

    onMounted(() => {
      console.log("comments", comments.value);
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
      console.log("post", post);
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
      console.log("post", post);
    };

    const getPostById = (id) => {
      return comments.value.find((item) => item.id === id);
    };

    const Search = () => {
      if (searchText.value === "") {
        return;
      }

      console.log(searchText.value);
    };
    watch(comments, (newComments) => {
      console.log("Comments have changed:", newComments);
    }, { deep: true });

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
      searchText
    };
  }
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
    background-color: rgb(254,231,50);
    color: rgb(106,61,0);
    border: none;
    cursor: pointer;
}

.searchBar-button:hover {
  background-color: rgb(249, 228, 64);
  color: rgb(106,61,0);
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
  --background: rgb(255,231,51);
  background: none;
  overflow: hidden;
  padding: 0.8rem 3rem;
  position: relative;
  text-decoration: none;
  width: 150px;
  margin-top: 20px;
  color: rgb(102,60,0);
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
  -webkit-clip-path: polygon(
      0 0,
      calc(100% - var(--tilt)) 0,
      100% 50%,
      calc(100% - var(--tilt)) 100%,
      0 100%
  );
  clip-path: polygon(
      0 0,
      calc(100% - var(--tilt)) 0,
      100% 50%,
      calc(100% - var(--tilt)) 100%,
      0 100%
  );
}
</style>
