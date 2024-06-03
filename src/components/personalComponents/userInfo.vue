<template>
  <div class="main_container_userInfo_container">
    <div class="main_container_user_avatar_container">
      <img :src=userInfo.avatar class="main_container_user_avatar" alt="">
    </div>

    <div class="main_container_user_info">
      <div class="main_container_user_info_name">{{ userInfo.userName }}</div>
      <div class="main_container_user_info_id">account: {{ userInfo.account }}</div>
      <p class="main_container_user_info_signature">
        {{ userInfo.intro }}
      </p>
    </div>
    <div class="button-container">
      <button @click="sendMessage">私信</button>
      <button v-if="isMaster" @click="edit">编辑</button>
    </div>


  </div>
</template>

<script lang="ts">
import { toRefs, inject, ref, watchEffect, getCurrentInstance } from 'vue';
import store from '../../store';


export default {
  name: 'UserInfo',
  props: {
    userInfo: {
      type: Object,
      required: true,
    }

  },

  setup(props) {
    const router = inject('$router') as any;
    const api = inject("$api") as any;
    const { userInfo } = toRefs(props);
    const instance = getCurrentInstance();
    const proxy = instance?.proxy;

    const isMaster = ref(store.getters.getUserInfo.userId === userInfo.value.userId);
    const sendMessage = () => {
      if (!store.getters.getIsLogin) {
        store.dispatch('SetShowLoginWindow', true);
        return;
      }
      if (store.getters.getUserInfo.userId === userInfo.value.userId) {

        proxy?.$message.error('不能给自己发消息');
        return;
      }
      api.chat.createChat({ dstId: userInfo.value.userId }).then(
        (res:any) => {
          if (res != null) {
            store.dispatch('SetShowChatWindow', true);
            console.log('sendMessage');
          }

        }
      )
      // 创建一个会话，然后打开聊天窗口

    };

    const edit = () => {
      router.push(`/personal/${userInfo.value.userId}/infoEdit`);
    };
    watchEffect(() => {
      isMaster.value = store.getters.getUserInfo.userId === userInfo.value.userId;
    });


    return {
      userInfo,
      sendMessage,
      edit,
      isMaster
    };
  },
};
</script>

<style scoped>
.main_container_userInfo_container {
  width: 980px;
  height: 200px;
  background-color: rgb(247, 248, 252);
  margin-top: 20px;
  display: flex;
  border-radius: 5px;
}

.main_container_user_avatar_container {
  height: 100%;
  width: 200px;
  background-color: rgb(255, 255, 255);
  display: inline;
  float: left;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.main_container_user_avatar {
  border-radius: 50%;
  overflow: hidden;
  width: 150px;
  height: 150px;
  margin-top: 20px;
  margin-left: 20px;
  border: 1px solid #9f9f9f;
}

.main_container_user_info {
  height: 100%;
  width: 580px;
  background-color: rgb(255, 255, 255);
  display: inline;
  /* float: right; */
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.main_container_user_info_name {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;

}

.main_container_user_info_id {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 10px;
}

.main_container_user_info_signature {
  height: 100px;
  line-height: 18px;
  margin-top: 12px;
  margin-right: 12px;
  background-color: rgb(255, 255, 255);
  word-wrap: break-word;
  word-break: break-all;
  font-size: 0.8em;
  color: #999;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  padding: 20px;
  background-color: rgb(255, 255, 255);
}

.button-container button {
  padding: 10px 20px;
  margin: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  background-color: #fff;
  color: #00b2ff;
  border: 1px solid #00c3ff;
  border-radius: 4px;
}



.button-container button:hover {
  color: #00a2ff;
  border: 1px solid #00a2ff;
}
</style>
