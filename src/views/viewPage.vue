<template>
  <div>
    <div class="main_container">
      <div class="main_container_message">
        <div class="main_container_mainMessage">
          <div class="main_main_card">
            <div class="main_main_card_title">{{ post.title }}</div>

            <div class="main_main_card_content" v-html="post.content">
              
            </div>

            <div class="main_main_card_other_info_container">
              <div class="main_main_card_other_info_left">{{ post.date }}</div>
              <div class="main_main_card_other_info_right"></div>
            </div>
            <div class="main_main_card_comment_input_container">

                <div style="margin-left: 20px; margin-right: 20px;">
                     <quillComponent 
                     @update:content="handleContentChange"
                     ></quillComponent>
                </div>
             
              <div class="main_main_card_comment_operator_container">
                <div class="main_main_card_comment_operator_container_operator">
                  <img
                    class="main_icon_svg"
                    src="../assets/icon/time.svg"
                    alt=""
                  />
                  <img
                    class="main_icon_svg"
                    src="../assets/icon/thumb-down.svg"
                    alt=""
                  />
                  <img
                    class="main_icon_svg"
                    src="../assets/icon/thumb-up.svg"
                    alt=""
                  />
                  <img
                    class="main_icon_svg"
                    src="../assets/icon/thunder.svg"
                    alt=""
                  />
                </div>
                <button @click="comment">评论</button>
              </div>
            </div>
          </div>

          <commentCardVue
            v-for="item in comments"
            :comment="item"
            :key="item.id"
            @update:thumpUp="handleThumbUpChange"
            @update:thumpDown="handleThumbDownChange"
          ></commentCardVue>
        </div>
        <div class="main_container_rightMessage">
          <div class="main_container_mainMessage_rightMessage_card">2</div>
          <div class="main_container_mainMessage_rightMessage_card">2</div>
          <div class="main_container_mainMessage_rightMessage_card">2</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import commentCardVue from "../components/viewComponents/commentCard.vue";
import quillComponent from "../components/editPostComponents/quillComponent.vue";
import store from "../store";

export default {
  components: { commentCardVue, quillComponent },
  name: "ViewPage",
  // Your script logic here
  data() {
    return {
      newContent: "",

      comments: [
        {
          id: "1",
          content:
            '<img src="https://picx.zhimg.com/70/v2-9105a6b428137896ae3cfbc537d01a79_1440w.avis?source=172ae18b&biz_tag=Post" alt=""> <p>图片不错，偷了</p>',
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
      post: {
          id: "1",
          title: "寻找失落的提瓦特大陆",
          content: '<p>家人们谁懂啊，这个游戏一点都不好玩</p><img  src="https://tsundora.com/image/2020/10/genshin_3.jpg"></img><img src="https://tsundora.com/image/2020/10/genshin_3.jpg"></img><p>竟然有男角色</p><img src="https://tsundora.com/image/2020/10/genshin_3.jpg"></img>',
          date: "2022-12-12 12:12:12",
          thumbUp: 121,
          isLiked: 0,
          userInfo: {
            username: "张三",
            avatar: "https://tsundora.com/image/2020/10/genshin_3.jpg",
            level: "4级",
            userId: "12110112",
            userMassage: "这是用户的信息",
          },
        },
    };
  },

  methods: {
    handleThumbUpChange({id}:any) {
      let comment = this.getPostById(id);
      if (comment != null) {
        //如果点过踩
        if (comment.isLiked === -1) {
          let thumbUp = comment.thumbUp + 1;
          comment.isLiked = 1;
          comment.thumbUp = thumbUp;
        } else {
          let thumbUp = comment.isLiked === 1 ? comment.thumbUp - 1 : comment.thumbUp + 1;
          comment.isLiked = comment.isLiked === 1 ? 0 : 1;
          comment.thumbUp = thumbUp;
        }

      }    
      console.log('comment', comment);
    },

    handleThumbDownChange({id}:any) {
      let comment = this.getPostById(id);
      if (comment != null) {
        //如果点过赞
        if (comment.isLiked === 1) {
          let thumbUp = comment.thumbUp - 1;
          comment.isLiked = -1;
          comment.thumbUp = thumbUp;
        } else {
            comment.isLiked = comment.isLiked === -1 ? 0 : -1;
        }
      }
      console.log('comment', comment);
    },

    getPostById(id:any) {
      // 根据id获取帖子
        return this.comments.find(item => item.id === id);
    },

    handleContentChange(newContent:any) {
      console.log("awdw");
      this.newContent = newContent;

    },

    //评论
    comment(){
        if(!store.getters.getIsLogin){
          this.$router.push('/login');
          return;
        } 
        let userInfo = store.getters.getUser;


        let newComment:any = {
        id: "1",
        content: this.newContent,
        date: "2022-12-12 12:12:12",
        thumbUp: 121,
        isLiked: 0,
        userInfo: userInfo
      };
        console.log('newComment', newComment);
        this.comments.push(newComment);
    }

    
  },
};
</script>

<style >
.main_container {
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: rgb(247,248,252);
  box-sizing: content-box;
}

.main_container::after{
  content: '';
  display: block;
  clear: both;

}
.main_container_message {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  padding-left: 100px;
  padding-right: 100px;
  background-color: transparent;
  box-sizing: content-box;
}
.main_container_mainMessage {
  width: 720px;
  height: 100%;
  background-color: transparent;
  float: left;
}
.main_container_rightMessage {
  width: 280px;
  height: 100%;
  background-color: transparent;
  float: right;
}

.main_container_mainMessage_rightMessage_card {
  width: 220px;
  height: 300px;
  background-color: rgb(255, 255, 255);
  margin: 20px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 5px;
}

.main_container_mainMessage_rightMessage_card:hover {
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
}

.main_main_card {
  width: 100%;
  min-height: 300px;
  background-color: rgb(255, 255, 255);
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid rgb(255, 255, 255);
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.main_main_card_title {
  line-height: 1.5em;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  font-weight: bold;
  background-color: transparent;
  font-size: 1.5em;
}

.main_main_card_content {
  line-height: 18px;
  margin-top: 8px;
  background-color: transparent;
  border-bottom: 1px solid rgb(162, 160, 160);
}

.main_main_card_content p {
  width: 100%;
  margin: 0;
  color: black;
  font-size: 1em;
  margin-top: 10px;
  word-wrap: break-word;
  word-break: break-all;
}
.main_main_card_content img {
  max-width: 80%;

  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.main_main_card_other_info_container {
  width: 100%;
  height: 20px;
  margin-top: 10px;
  background-color: transparent;
  align-items: center;
}

.main_main_card_other_info_left {
  width: 40%;
  height: 20px;
  background-color: transparent;
  align-items: center;
  float: left;
  font: 0.6em sans-serif;
}

.main_main_card_other_info_right {
  width: 40%;
  height: 20px;
  background-color: transparent;
  align-items: center;
  float: right;
}

.main_main_card_comment_input_container {
  width: 100%;
  min-height: 50px;
  background-color: transparent;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.main_main_card_comment_input {
  width: 100%;
  min-height: 120px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid rgb(162, 160, 160);
  border-radius: 5px;
  word-wrap: break-word;
  word-break: break-all;
  display: flex;
  margin-bottom: 10px;
}

.main_main_card_comment_operator_container {
  width: 100%;
  height: 35px;
  background-color: transparent;
}

.main_main_card_comment_operator_container_operator {
  width: 180px;
  height: 35px;
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 5px;
  float: left;
}

.main_main_card_comment_operator_container_operator img {
  width: 30px;
  height: 30px;
  margin: 2px 5px 0 2px;
  cursor: pointer;
}

.main_main_card_comment_operator_container_operator img:hover {
  background-color: rgb(71, 74, 88);
  border-radius: 5px;
}

.main_main_card_comment_operator_container button {
  width: 60px;
  height: 25px;
  background-color: rgb(31, 34, 51);
  color: white;
  border: none;
  border-radius: 5px;
  margin: 5px 10px 0 5px;
  float: right;
}


</style>
