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
                <option value="体育比赛">体育比赛</option>
                <option value="电竞比赛">电竞比赛</option>
                <option value="艺术比赛">艺术比赛</option>
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
import {ref, inject} from "vue";



let quillContent = ref();
let title = ref("标题");
let content = ref("你好");
let selectedPlate = ref("体育比赛");
let api:any = inject('$api');


const publicPost = () => {
  console.log(title.value);
  console.log(quillContent.value.editor.querySelector('.ql-editor').innerHTML);
  console.log(selectedPlate.value);
  //向后端发送帖子内容
  let post:any = {
    id: 0,
    title: title.value,
    body: content.value,
    thumbUp: 0,
    isLiked: 0,
    userId: 1,
    userName: 12110425,
    status: 0,
  };

  api.post.createPost(post).then((res:any) => {
    console.log(res);
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
  height: 26.6px;
  padding: 10px;
  padding-left: 20px;
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
  height: 60%;
  margin: auto;
  border: 1px solid rgb(207, 205, 205);
  background: #fff;
  border-radius: 5px;
}

.edit-box-plate {
  width: 18%;
  height: 70%;
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
  background-color: red;
  border: 1px solid rgb(27, 24, 24);
  border-radius: 5px;
  color: white;
  cursor: pointer;
}




.edit-box-textarea{
  background-color: #fff;
}
  
</style>


