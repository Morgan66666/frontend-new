<template>
  <div class="comment_card">
    <div class="main_userinfo">
      <div class="userInfo_avatar" @click="enterUserPage()">
        <img :src="userInfo.avatar" alt="" />
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
        <img class="main_card_img" v-for="(img, index) in imgs" :key=index :src="img" alt="">
      </div>
    </router-link>

    <div class="other_info_container">
      <div class="other_info_date">
        {{ formatDate(comment.createTime) }}
      </div>
      <div class="other_info_operations">
        <svg @click="clickStar" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" class="star" :class="{ active: comment.isLiked == 1 }"  data-v-b42ec39c="">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M19.8071 9.26152C18.7438 9.09915 17.7624 8.36846 17.3534 7.39421L15.4723 3.4972C14.8998 2.1982 13.1004 2.1982 12.4461 3.4972L10.6468 7.39421C10.1561 8.36846 9.25639 9.09915 8.19315 9.26152L3.94016 9.91102C2.63155 10.0734 2.05904 11.6972 3.04049 12.6714L6.23023 15.9189C6.96632 16.6496 7.29348 17.705 7.1299 18.7605L6.39381 23.307C6.14844 24.6872 7.62063 25.6614 8.84745 25.0119L12.4461 23.0634C13.4276 22.4951 14.6544 22.4951 15.6359 23.0634L19.2345 25.0119C20.4614 25.6614 21.8518 24.6872 21.6882 23.307L20.8703 18.7605C20.7051 17.705 21.0339 16.6496 21.77 15.9189L24.9597 12.6714C25.9412 11.6972 25.3687 10.0734 24.06 9.91102L19.8071 9.26152Z"
            fill="currentColor">
          </path>
        </svg>

        <img alt="" v-if="comment.isLiked === 1" src="../../assets/icon/thumb-up1.svg" @click="likes" />
        <img v-else src="../../assets/icon/thumb-up.svg" @click="likes" alt="" />
        <div class="other_info_operations_number">{{ comment.likes }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, PropType, ref,inject } from "vue";
import { computed } from "vue";
import { getUserInfo } from "../../utils/userUtil.vue";
import router from "../../router"
import moment from 'moment';

export default {
  name: "PostComment",

  props: {
    comment: {
      type: Object as PropType<any>,
      required: true,
    },
  },


  setup(props: any, cxy: any) {
    const api:any = inject("$api")
    const likes = () => {
      //根据id获得 评论
      api.post.updatePostLike({postId: props.comment.postId}).then((res: any) => {
        console.log("res", res)
              cxy.emit("update:thumpUp", {
        id: props.comment.postId,
      });
      })


      
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
      if (content == null) {
        return [];
      }
      let reg = /<img(.*?)>/g;
      let imgs = content.match(reg);
      //把img标签去掉，只留下src


      if (imgs != null) {
        if (imgs.length > 3) { imgs = imgs.slice(1, 3); }
        reg = /src="(.*?)"/g;
        for (let i = 0; i < imgs.length; i++) {
          imgs[i] = imgs[i].match(reg)[0];
          imgs[i] = imgs[i].slice(5, -1);
        }


      }

      return imgs;
    });
    // 先用正则表达式去掉所有img
    // 先用正则表达式匹配到第一个<p>的内容，然后截取前100个字符
    const shortContent = computed(() => {
      let imgReg = /<img(.*?)>/g
      let tabReg = /[^\S ]/g;
      let emptyReg = /<p><\/p>/g;
      let content = props.comment.body;
      if (content == null) {
        return "";
      }
      let reg = /<p>(.*?)<\/p>/g;
      let regTag = /<(.*?)>/g
      content = content.replace(imgReg, "");
      content = content.replace("<br>", "");
      content = content.replace(tabReg, "");
      content = content.replace(emptyReg, "");
      console.log("content", content);
      let shortContent = content.match(reg);

      console.log("shortContent", shortContent);
      if (shortContent != null) {
        shortContent = shortContent[0].replace(regTag, "");
        shortContent = shortContent.slice(0, 30);

      }

      return shortContent;
    });

    const formatDate = (timestamp: any) => {
      console.log("timestamp",timestamp)
      return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    };

    let clickStar = () => {
      if (props.comment.isLiked === 1) {
        props.comment.isLiked = 0;
      } else {
        props.comment.isLiked = 1;
        props.comment.likes += 1;
      }
    }

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
      // 获取用户是否点赞了该评论
      api.post.getIfUserLikePost({postId: props.comment.postId}).then((res: any) => {
        console.log("res", res)
        if (res.data === 1) {
          props.comment.isLiked = 1;
        } else {
          props.comment.isLiked = 0;
        }
      })
    })




    return { likes, imgs, enterUserPage, userInfo, shortContent, formatDate };
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
  color: rgb(151, 151, 151);
  align-items: center;
  font-size: 0.95em;
  margin-left: 18px;
}

.userInfo_level {
  background-color: rgb(176, 231, 109);
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

.star {
  transition: fill 0.3s ease;
  cursor: pointer;
}

.star:active {
  transform: scale(0.9);
}

.star:not(.active) {
  fill: grey;
  color: grey;
}

.star.active {
  fill: gold;
  color: gold;
}
</style>
