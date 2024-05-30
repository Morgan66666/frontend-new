<template>
  <div class="comment_card">
    <div class="main_userinfo">
      <div class="userInfo_avatar" @click="enterUserPage()">
        <img :src= "userInfo.avatar" alt="" />
      </div>
      <span class="userInfo_username" @click="enterUserPage()">{{
        userInfo.userName
      }}</span>
      <span class="userInfo_level">4级</span>
    </div>
    <router-link class="router-link" :to="'/post/' + comment.postId">
      <div class="main_card_title">
        <strong>{{ comment.title }}</strong>
      </div>
      <div class="main_card_content">{{ shortContent }}</div>
      <div class="main_card_img">
        <img class="main_card_img"  v-for="(img, index) in imgs" :key=index :src="img" alt="">
      </div>
    </router-link>

    <div class="other_info_container">
      <div class="other_info_date">
        {{ comment.date }}
      </div>
      <div class="other_info_operations">
        <img alt=""
          v-if="comment.isLiked === 1"
          src="../../assets/icon/thumb-up1.svg"
          @click="thumbUp"
        />
        <img  v-else src="../../assets/icon/thumb-up.svg" @click="thumbUp" alt=""/>
        <div class="other_info_operations_number" >{{ comment.thumbUp }}</div>
        <img
          v-if="comment.isLiked === -1"
          src="../../assets/icon/thumb-down1.svg"
          @click="thumbDown" alt=""
        />
        <img v-else src="../../assets/icon/thumb-down.svg" @click="thumbDown" alt=""/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {onMounted, PropType, ref} from "vue";
import { computed} from "vue";
import { getUserInfo } from "../../utils/userUtil.vue";
import router from "../../router"

export default {
  name: "PostComment",

  props: {
    comment: {
      type: Object as PropType<any>,
      required: true,
    },
  },

  
  setup(props:any, cxy:any) {
    const thumbUp = () => {
      //根据id获得 评论
      cxy.emit("update:thumpUp", {
        id: props.comment.postId,
      });
    };

    const thumbDown = () => {
      //根据id获得 评论
      console.log("thumbDown");
      cxy.emit("update:thumpDown", {
        id: props.comment.postId,
      });
    };


    const enterUserPage = ref(
      function () {
        router.push(`/personal/${props.comment.userId}`);
        alert("进入用户页面");
      }
    )
    //根据评论内容获得图片，最多三张
    const imgs = computed(() => {
      let content = props.comment.body;
      if(content == null){
        return [];
      }
      let reg = /<img.*?src="(.*?)".*?>/g;
      let imgs = content.match(reg);
      //把img标签去掉，只留下src
      

      if(imgs != null){
        if(imgs.length > 3)
          {imgs = imgs.slice(1, 3);}
            reg = /src="(.*?)"/g;
      for(let i = 0;i < imgs.length;i++){
        imgs[i] = imgs[i].match(reg)[0];
        imgs[i] = imgs[i].slice(5, -1);
      }


      }

      return imgs;
    });
    // 先用正则表达式去掉所有img
    // 先用正则表达式匹配到第一个<p>的内容，然后截取前100个字符
    const shortContent = computed(() => {
      let imgReg = /<img(.*?)>/
      let content = props.comment.body;
      if(content == null){
        return "";
      }
      let reg = /<p>(.*?)<\/p>/;
      let regTag = /<(.*?)>/
      content = content.replace(imgReg, "");
      let shortContent = content.match(reg);
      
      if(shortContent != null){
        shortContent = shortContent[1].slice(0, 30);
        shortContent = shortContent.replace(regTag, "");
      }

      return shortContent;
    });
    
    let id = props.comment.userId;
    let userInfo = ref({
    "userId": 1,
    "userName": "",
    "gender": "男",
    "birth": null,
    "account": "",
    "intro": "",
    "avatar": ""
})
    //根据评论id获得用户信息，显示用户头像等

    onMounted(() => {
        getUserInfo(id).then(res => {
        console.log("res", res)
        userInfo.value = res;
        console.log(userInfo.value)
    })
    })



      
    return { thumbUp, thumbDown, imgs, enterUserPage, userInfo , shortContent};
  },
};
</script>
+




<style scoped>
.comment_card {
  width: 100%;

  background-color: rgb(255, 255, 255);
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(200, 200, 200);
}

.comment_card:hover {
  background-color: rgba(252, 252, 252, 0.846)
}

.main_userinfo {
  width: 100%;
  height: 30px;
  align-items: center;
  display: flex;
  justify-content: left;
}

.main_card_title {
  line-height: 20px;
  margin-top: 18px;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  font-weight: bold;
}

.main_card_title:hover {
  color: #1a73e8;
}

.main_card_content {
  line-height: 18px;
  margin-top: 10px;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  color: #706d6d;
  font-size: 0.8em;
}

.main_card_img img {
  width: 30%;
  height: 180px;
  background-color: rgba(252, 252, 252, 0.846);
  align-items: center;
  margin-top: 8px;
  margin-left: 10px;
  display: inline-block;
}

.userInfo_avatar img {
  width: 40px;
  height: 40px;
  background-color: rgba(252, 252, 252, 0.846);
  display: inline;
  float: left;
  border-radius: 50%;
}

.userInfo_avatar {
  width: 30px;
  height: 30px;
  align-content: center;
  display: inline;
}

.userInfo_username {
  color: rgb(151,151,151);
  align-items: center;
  font-size: 0.95em;
  margin-left: 18px;
}
.userInfo_level {
  background-color:rgb(176, 231, 109);
  width: 36px;
  text-align: center;
  font: 0.8em sans-serif;
  margin-left: 10px;
}

.userInfo_userId {
  align-items: center;
  font: 0.5em sans-serif;
  margin-left: 10px;
}

.router-link {
  text-decoration: none;
  color: black;
}

.other_info_container {
  width: 100%;
  height: 26px;
  margin-top: 10px;
  background-color: transparent;
  align-items: center;
}

.other_info_date {
  width: 30%;
  height: 26px;
  background-color: transparent;
  line-height: 24px;
  display: inline-block;
}

.other_info_operations {
  width: 15%;
  height: 26px;
  background-color: transparent;
  align-items: center;
  float: right;
  display: flex;
}

.other_info_operations img {
  height: 100%;
  background-color: transparent;
  align-items: center;
  display: inline-block;
}

.other_info_operations img:hover {
  height: 100%;
  background-color: rgba(252, 252, 252, 0.846);
  align-items: center;
  display: inline-block;
}

.other_info_operations_number {
  height: 100%;
  background-color: transparent;
  display: inline-block;
  text-align: center;
  font-size: 0.8em;
  line-height: 24px;
}



</style>
