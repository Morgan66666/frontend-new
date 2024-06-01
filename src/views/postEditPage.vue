<template>
  <div>
    <div class="main_container">
      <div class="main_container_message">
        <div class="title">
          <a>发帖</a>
        </div>
        <div class="edit-box">
          <div class="edit-box-item">
            <div class="edit-box-item-label-container">
              <a>标题:</a>
            </div>
            <div class="edit-box-item-input-container">
              <input
                class="edit-box-title-input"
                type="text"
                placeholder="标题(必填)"
                v-model="title"
              />
            </div>
          </div>

          <div class="edit-box-item" style="min-height: 500px;">
            <div class="edit-box-item-label-container">
              <a>内容:</a>
            </div>
            <div class="edit-box-item-input-container">
              <div class="edit-box-textarea">
                <quillComponent @update:content="handleContentChange" ref="quillContent"/>
              </div>
            </div>

            <div>
              <div></div>
            </div>
          </div>

          <div class="edit-box-item">
            <div class="edit-box-item-label-container">
              <a>板块:</a>
            </div>
            <div class="edit-box-item-input-container">
              <select class="edit-box-plate" v-model="selectedPlate">
                <option value="体育">体育</option>
                <option value="电竞">电竞</option>
                <option value="艺术">艺术</option>
              </select>
            </div>
          </div>

          <div class="edit-box-button">
          <button @click="publicPost">发表</button>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import quillComponent from "../components/editPostComponents/quillComponent.vue";
import {ref, inject, onMounted, getCurrentInstance} from "vue";
import { UserInfo } from "@/types";
import store from "../store";

// 先检查用户是否登录，没登录就跳转到登录页面
onMounted(() => {
  let proxy = getCurrentInstance()?.proxy as any;
  if (!store.getters.getIsLogin){
    proxy.$message.success("请先登录")
    store.dispatch("SetShowLoginWindow", true);
    let router:any = inject("$router") as any;
    router.push('/');
  }
  console.log(userInfo);
});

let quillContent = ref();
let title = ref("");
let content = ref("你好");
let selectedPlate = ref("体育");
let api:any = inject('$api');
let userInfo:UserInfo = store.getters.getUserInfo;

const publicPost = () => {
  console.log(title.value);
  console.log(quillContent.value.editor.querySelector('.ql-editor').innerHTML);
  console.log(selectedPlate.value);

  //向后端发送帖子内容
  let post:any = {
    title: title.value,
    body: content.value,
    likes: 0,
    isLiked: 0,
    userId: userInfo.userId,
    userName: userInfo.userName,
    type: selectedPlate.value,
    status: 0
  };

  api.post.createPost(post).then((res:any) => {
    console.log(res);
    alert("创建成功");
  });

};

const handleContentChange = () => {
  content.value = quillContent.value.editor.querySelector('.ql-editor').innerHTML;
};


</script>


<style scoped>
.main_container {
  width: 100%;
  height: 100%;
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
  background-color: transparent;
  box-sizing: content-box;
}
.title {
  width: calc(100% - 30px);
  height: 27px;
  padding: 10px 10px 10px 20px;
  background-color: rgb(255, 255, 255);
  box-sizing: content-box;
  border-bottom: 1px solid rgb(216, 212, 212);
  font-weight: bold;
}

.title a {
  font-size: 20px;
}

.edit-box {
  width: 100%;
  height: 800px;
  background-color: rgb(255, 255, 255);
  box-sizing: content-box;
}

.edit-box-item {
  width: 100%;
  height: auto;
  padding-top: 20px;
  background-color: transparent;
  box-sizing: content-box;
  display: flex;
}

.edit-box-item-label-container {
  width: 10%;
  height: auto;
  background-color: transparent;
  display: flex;
}

.edit-box-item-label-container a {
  margin-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
}

.edit-box-item-input-container {
  width: 80%;
  height: auto;
  background-color: transparent;
  display: flex;
  justify-items: center;
  flex-direction: column;
}



.edit-box-title-input {
  width: 98%;
  height: 100%;
  margin: auto;
  padding-left: 15px;
  border: 1px solid rgb(207, 205, 205);
  background: #fff;
  border-radius: 5px;
  outline: none;
}

.edit-box-plate {
  width: 18%;
  height: 100%;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  font-size: 20px;
   border-radius: 5px;
  border: 1px solid rgb(163, 159, 159);
  background-color: #fff;

}



.edit-box-plate option {
  font-size: 20px;
  color: black;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
  text-align: center;
  text-align-last: center;
  text-justify: auto;
  text-overflow: clip;
  text-transform: none;
  text-indent: 0;
  text-decoration: none;
  text-shadow: none;
  text-underline-position: auto;
  text-rendering: auto;
  text-orientation: mixed;
}

.edit-box-textarea {
  width: 98%;
  min-height: 90%;
  height: auto;
  margin: auto;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(162, 160, 160);
}

.edit-box-textarea img {
  max-width: 80%;
  margin: auto;
}

.edit-box-button{
  width: 100%;
  height: 100px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-box-button button{
  width: 200px;
  height: 50px;
  font-size: 20px;
  background-color: rgb(255,231,51);
  border: 1px solid rgb(27, 24, 24);
  border-radius: 5px;
  color: rgb(102,60,0);
  cursor: pointer;
}




.edit-box-textarea{
  background-color: #fff;
}

</style>


