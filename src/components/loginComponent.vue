<template>
  <div class="login-card">
    <div class="login-logo">
      <img src="../assets/LOGO.svg" alt="SUSTech Logo" />
    </div>
    <h1><b>登录</b></h1>

    <div class="input-container">
      <label :class="{ 'label-active': active_username }">工号/学号</label>
      <!--        <input type="text" @focus="activateLabel" @blur="deactivateLabel">-->
      <input
        @focus="activateLabel_username"
        @blur="deactivateLabel_username"
        v-model="username"
      />
    </div>
    <div class="input-container">
      <label :class="{ 'label-active': active_password }">密码</label>
      <!--        <input type="text" @focus="activateLabel" @blur="deactivateLabel">-->
      <input
        type="password"
        @focus="activateLabel_password"
        @blur="deactivateLabel_password"
        v-model="password"
      />
    </div>

    <button v-on:click="login">登录</button>


    <hr class="separate-line" />

    <div class="tool">
      <div class="text-section">
        <router-link to="#" class="text left">{{ leftText }}</router-link>
        <hr class="line" />
        <router-link to="#" class="text right">{{ rightText }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

import { inject } from "vue";
import { UserInfo } from "../types";

export default defineComponent({
  setup(_, { emit }) {
    const api: any = inject("$api");
    const store: any = inject("$store");
    const active_username = ref(false);
    const active_password = ref(false);
    const username = ref("");
    const password = ref("");
    const leftText = ref("忘记密码");
    const rightText = ref("创建账户");

    const activateLabel_username = () => {
      active_username.value = true;
    };

    const deactivateLabel_username = (event: any) => {
      if (event.target.value === "") {
        active_username.value = false;
      }
    };

    const activateLabel_password = () => {
      active_password.value = true;
    };

    const deactivateLabel_password = (event: any) => {
      if (event.target.value === "") {
        active_password.value = false;
      }
    };

    const login = async () => {
      let user: UserInfo = null;
      let token = null;

      let loginForm = {
        account: username.value,
        password: password.value,
      };

      console.log("开始登录");
      console.log(loginForm);
      try {
        await api.login.getUserExistByAccount({ account: loginForm.account }).then((res: any) => {
          console.log(res);
        });


        await api.login.doLogin(loginForm).then((res: any) => {
          console.log(res);
          token = res.token;
          user = {
            userId: res.userResponse.userId,
            userName: res.userResponse.userName,
            avatar: res.userResponse.avatar,
            signature: res.userResponse.intro,
            birth: res.userResponse.birth,
            account: res.userResponse.account,
            gender: res.userResponse.gender,
            level: "4",
          };
        });
      } catch (error) {
        console.log(error);
      } finally {
        if (user) {
          store.dispatch("LoginIn", user);
          store.dispatch("SetToken", token);
          emit("login", true);
        } else {
          user = {
            avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
            userName: "admin",
            userId: "12110112",
            signature: "这是用户的信息",
            level: "4级",
            birth: "2000-01-01",
            account: "12110425",
            gender: "男",
          };
          store.dispatch("LoginIn", user);
          store.dispatch("SetToken", token);
          console.log(store.getters.getIsLogin);
          console.log(store.getters.getUserInfo);
          console.log(store.getters.getToken);
          emit("login", true);
        }
      }
    };

    return {
      active_username,
      active_password,
      username,
      password,
      leftText,
      rightText,
      activateLabel_username,
      deactivateLabel_username,
      activateLabel_password,
      deactivateLabel_password,
      login,
    };
  },
});
</script>
<style scoped>
.input-container {
  position: relative;
  padding-top: 20px;
}

input[type="text"] {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  border: 2px solid #2b7de9;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  border-color: #2b7de9;
}

label {
  position: absolute;
  left: 28px;
  top: 48px;
  color: #999;
  transition: all 0.3s ease;
  background-color: white;
  padding: 0 4px;
  margin-left: -4px;
}

.label-active {
  top: 27px;
  left: 28px;
  font-size: 12px;
  color: #2b7de9;
}

.login-card {
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background: #fff;
  text-align: center;
}

.login-logo img {
  width: 80%;
  margin-bottom: 1rem;
}

h1 {
  margin: 0.5rem 0;
  color: #202124;
  font-size: 24px;
}

p {
  margin: 0.5rem 0;
  color: #5f6368;
  font-size: 14px;
}

input {
  width: calc(100% - 24px);
  height: 50px;
  margin-top: 1rem;
  padding: 0 12px;
  font-size: 16px;
  line-height: 24px;
  color: #5f6368;
  background-color: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  outline: none;
}

input:focus {
  border-color: #1a73e8;
}

.guest-mode a,
.create-account a {
  color: #1a73e8;
  text-decoration: none;
  font-size: 14px;
}

button {
  margin-top: 1rem;
  width: 100%;
  padding: 0.8rem 1.6rem;
  font-size: 14px;
  color: #fff;
  background-color: #1a73e8;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2b7de9;
}

.tool {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-section {
  display: flex;
  align-items: center;
}

.text-section span {
  margin: 0 10px;
  /* 根据需要调整间距 */
}

.line {
  flex-grow: 1;
  border: none;
  border-top: 1px solid #ccc;
  /* 分割线颜色和样式 */
  margin: 0 10px;
  /* 根据需要调整分割线距离文字的间距 */
}

.text {
  text-decoration: none;
  /* 取消下划线 */
  color: grey;
  /* 文字颜色改为灰色 */
}

.separate-line {
  margin-top: 20px;
}

.left {
  margin-right: 120px;
}
</style>
