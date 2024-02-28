<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-logo">
        <img src="../assets/LOGO.svg" alt="SUSTech Logo" >
      </div>
      <h1><b>登录</b></h1>

      <div class="input-container">
        <label :class="{'label-active': active_username}">工号/学号</label>
<!--        <input type="text" @focus="activateLabel" @blur="deactivateLabel">-->
        <input @focus="activateLabel_username" @blur="deactivateLabel_username" v-model="username">
      </div>
<!--      <input type="password" placeholder="密码">-->
      <div class="input-container">
        <label :class="{'label-active': active_password}">密码</label>
        <!--        <input type="text" @focus="activateLabel" @blur="deactivateLabel">-->
        <input type="password" @focus="activateLabel_password" @blur="deactivateLabel_password" v-model="password">
      </div>
<!--      <p class="hint">Forgot email?</p>-->
<!--      <div class="guest-mode">-->
<!--        <p>Not your computer? Use Guest mode to sign in privately.</p>-->
<!--        <a href="#">Learn more</a>-->
<!--      </div>-->
      <div class="create-account">
        <a href="#">忘记密码</a>
      </div>
<!--      <a href="/home">-->
        <button v-on:click = "login">登录</button>
<!--      </a>-->

    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      active_username: false,
      active_password: false,
      username: '',
      password: ''
    };
  },
  methods: {
    activateLabel_username() {
      this.active_username = true;
    },
    deactivateLabel_username(event) {
      if (event.target.value === '') {
        this.active_username = false;
      }
    },
    activateLabel_password() {
      this.active_password = true;
    },
    deactivateLabel_password(event) {
      if (event.target.value === '') {
        this.active_password = false;
      }
    },
    login() {
      // alert("login")
      let loginForm = {
        username: this.username,
        password: this.password
      }
      //TODO: login

    },
  }
}
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

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif;
}

.login-card {
  width: 100%;
  max-width: 350px;
  margin: auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
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

.hint {
  margin-top: 1rem;
  font-size: 14px;
}

.guest-mode,
.create-account {
  margin-top: 1rem;
  color: #1a73e8;
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

@media (max-width: 400px) {
  .login-card {
    margin: 1rem;
    padding: 1rem;
  }
}
</style>

