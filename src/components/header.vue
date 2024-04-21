<template>
  <div>
    <div class="header_container">
      <div class="header_log">

        <img style="width: auto; height: 100%;" src="../assets/SUSTech.svg" alt="南科大">
      </div>
      <div class="header_nav">
        <router-link to="/" class="nav_link" :class="{ active: $route.path === '/' }">首页</router-link>
        <router-link to="/activities" class="nav_link" :class="{ active: $route.path.startsWith('/activities') }">活动
        </router-link>
            <router-link to="/forum" class="nav_link" :class="{ active: $route.path.startsWith('/forum') }">论坛</router-link>

      </div>
      <div class="header_search_container">
        <input class="header_search" type="text" name="search" id="search" placeholder="搜索">
<!--        <router-link to="/personal" class="nav_link" :class="{ active: $route.path.startsWith('/personal') }">-->
          <div class="userInfo_avatar" @click = "avatar">
            <img src="../assets/霍霍.png" alt="">
          </div>
<!--        </router-link>-->
      </div>
      <div class="login" v-if="isVisible">
        <login-component @login="login"></login-component>
      </div>
        



    </div>
    <div class="background" v-if="isVisible" @click="isVisible = false"></div>
  </div>
</template>

<script lang="ts">

import { ref } from "vue";
import loginComponent from "../components/loginComponent.vue";
import router from "../router";
import store from "../store";


export default {
  name: 'headerOfMainPage',

  components: {loginComponent},
  setup() {
    let isVisible = ref(false);
    const avatar = () => {
      if(store.getters.getIsLogin){
        router.push(`/personal/${store.getters.getUser.userId}`);
      }else{
        isVisible.value = true;
      }
    };

    const login = (success:any) => {
      if(success){
        isVisible.value = false;
        router.push(`/`);
      };
    }


    return {avatar, isVisible, login};
  },


}
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
  width: 30em;
  height: 100%;
  background-color: rgb(31,34,51);
  justify-content: left;
  justify-items: center;
  vertical-align: middle


}

.header_nav a {
  color: white;
  text-decoration: none;
  width: 3.4em;
  height: 100%;
  text-align: center;
  display: inline-block;
  line-height: 2.2em;
  font-size: 1.5em;
}

.header_nav a.active {
  background-color: rgb(71, 74, 88);
}

.header_nav a:hover {
  background-color: rgb(71, 74, 88);
}

.header_search_container {
  width: 14em;
  height: 100%;
  background-color: rgb(31, 34, 51);
  justify-content: center;
  justify-items: center;
  vertical-align: middle;
  display: flex;
}

.header_search {
  margin-top: 1.2em;
  height: 1.5em;
  border-radius: 5px;
  background-color: #FFFFFF;
}

.userInfo_avatar img {
  height: 3em;
  width: 3em;
  margin-top: 0.2em;
  background-color: rgb(183, 144, 144);
  display: inline;
  margin-left: 12em;
  border-radius: 60%;
  cursor: pointer;
}

.userInfo_avatar {

  height: 100%;
  align-content: center;
  display: inline;
  
}

.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
}

.background {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: block;

}

</style>
