<template>
  <div>
    <div class="header_container">
      <div class="header_log">
        <img
          style="width: auto; height: 100%"
          src="../assets/SUSTech.svg"
          alt="南科大"
        />
      </div>
      <div class="header_nav">
        <router-link
          to="/"
          class="nav_link"
          :class="{ active:  router.currentRoute.value.path === '/' }"
          >首页</router-link
        >
        <router-link
          to="/activities"
          class="nav_link"
          :class="{ active: router.currentRoute.value.path.startsWith('/activities') }"
          >活动
        </router-link>
        <router-link
          to="/forum"
          class="nav_link"
          :class="{ active: router.currentRoute.value.path.startsWith('/forum') }"
          >论坛</router-link
        >
      </div>
      <div class="header_search_container">
        <div class="userInfo_avatar">
          <img :src=userInfo?.avatar @click="avatar" alt="" />
        </div>
        <div class="userInfo-username">{{ userInfo?.userName }}</div>
        <div class="options" v-if="showOptions">
          <a @click="toPersonal">个人主页</a>
          <a @click="showChat">消息</a>
          <a @click="logOut">登出</a>
        </div>
      </div>
      <div class="login" v-show="isVisible">
        <login-component @login="login"></login-component>
      </div>
    </div>
    <div class="chat" v-show='chatVisible'>
      <chat-component></chat-component>
    </div>

    <div class="background" v-show="backIsVisible" @click="hide"></div>
    <div class=""></div>
  </div>
</template>

<script lang="ts">
import { ref, watchEffect, inject } from "vue";
import loginComponent from "../components/loginComponent.vue";
import chatComponent from "./chatComponent.vue";
import store from "../store";
import { UserInfo } from "@/types";

export default {
  name: "headerOfMainPage",

  components: { loginComponent, chatComponent },
  setup() {
    let isVisible = ref(store.getters.getShowLoginWindow);
    let backIsVisible = ref(store.getters.getShowChatWindow||isVisible);
    let chatVisible = ref(store.getters.getShowChatWindow)
    // let router = useRouter();
    let router:any = inject("$router");
    const showOptions = ref(false);
    store.dispatch('SetShowChatWindow', false)
    store.dispatch('SetShowLoginWindow', false)
    const avatar = () => {
      if (store.getters.getIsLogin) {
        showOptions.value = !showOptions.value;
        
      } else {
        store.dispatch('SetShowLoginWindow', true)
        backIsVisible.value = true;
        showOptions.value = false;
      }
    };

    const showChat = () => {
      store.dispatch('SetShowChatWindow', true)
      backIsVisible.value = !backIsVisible.value;
      showOptions.value = false;
    };

    const toPersonal = () => {
      if (store.getters.getIsLogin) {
        router.push(`/personal/${store.getters.getUserInfo.userId}`);
        showOptions.value = false;
      } else {
        store.dispatch('SetShowLoginWindow', true)
        showOptions.value = false;
      }
    };


    const defaultUserInfo:UserInfo = {
      userId: "",
      userName: "未登录",
      intro: "这个人很懒，什么都没写",
      avatar: "https://cs304.oss-cn-shenzhen.aliyuncs.com/074cb3a6-2b72-479e-b7b8-81839006f3d7.png",
      gender: "保密",
      level: "4",
      birth: "2000-01-01",
    }

    
    const logOut = () => {
      store.dispatch("LoginOut");
      userInfo.value = defaultUserInfo;
      hide();
      showOptions.value = false;
      router.push(`/`);
      alert("登出成功");
    }
    const userInfo = ref(store.getters.getUserInfo);
    if (!store.getters.getIsLogin) {
      userInfo.value = defaultUserInfo;
    }
    

    const login = (success: any) => {
      if (success) {
        hide();
        userInfo.value = store.getters.getUserInfo;
        console.log("登录成功");
        router.push(`/`);
      }
    };

    watchEffect(() => {

      
      if(!store.getters.getIsLogin){
        userInfo.value = defaultUserInfo;
      }else{
        userInfo.value = store.getters.getUserInfo;
      }
      chatVisible.value = store.getters.getShowChatWindow
      isVisible.value = store.getters.getShowLoginWindow;
      backIsVisible.value = store.getters.getShowChatWindow||store.getters.getShowLoginWindow
    });

    const hide = () => {
      store.dispatch("SetShowChatWindow",false)
      store.dispatch("SetShowLoginWindow",false)
    };

    return {
      avatar,
      isVisible,
      login,
      backIsVisible,
      showOptions,
      showChat,
      toPersonal,
      hide,
      userInfo,
      logOut,
      router,
      store,
      chatVisible
    };
  },
};
</script>

<style scoped>
.header_container {
  width: 100%;
  height: 3.5em;
  background-color: rgb(31, 34, 51);
  border-radius: 5px 5px 0 0;
  display: flex;
  justify-content: center;
}

.header_log {
  width: 4em;
  height: 100%;
  background-color: transparent;
}

.header_nav {
  width: 40em;
  height: 100%;
  background-color: rgb(31, 34, 51);
  justify-content: left;
  justify-items: center;
  vertical-align: middle;
  display: flex;
}

.header_nav a {
  color: white;
  text-decoration: none;
  width: 3.4em;
  height: 100%;
  text-align: center;
  display: inline-block;
  line-height: 3.1em;
  font-size: 1.1em;
}

.header_nav a.active {
  background-color: rgb(71, 74, 88);
  font-weight: bold;
  font-size: 1.2em;
}

.header_nav a:hover {
  background-color: rgb(71, 74, 88);
}

.header_search_container {
  width: 14em;
  height: 100%;
  background-color: rgb(31, 34, 51);
  display: flex;
  flex-direction: row; 
  position: relative;
}

.header_search {
  margin-top: 1.2em;
  height: 1.5em;
  border-radius: 5px;
  background-color: #ffffff;
}

.userInfo_avatar img {
  height: 3em;
  width: 3em;
  margin-top: 0.2em;
  background-color: rgb(183, 144, 144);
  display: inline;
  /* margin-left: 12em; */
  border-radius: 60%;
  cursor: pointer;
}

.userInfo_avatar {
  position: relative;
  height: 100%;
  align-content: center;
  display: inline;
}

.userInfo-username {
  height: 100%;
  width: 10em;
  background-color: rgb(31, 34, 51);
  display: inline;
  margin-left: 0.5em;
  line-height: 3.5em;
  color: white;
}

.login {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
}

.chat {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
}

.background {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: block;
}

.options {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: rgb(31,34,51);
  min-width: 120px;
  left: -10px;
  top: 3.5em;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 120;
}

.options a {
  color: white;
  text-decoration: none;
  padding: 5px;
  text-align: center;
  border-radius: 5px;
}

.options a:hover {
  background-color: rgb(71, 74, 88);
}

.userInfo_avatar:hover .options {
  display: block;
}
</style>
