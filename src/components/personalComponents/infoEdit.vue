<template>
    <div>
        <div class="main_container_user_title">
            <a>编辑资料</a>
        </div>

        <hr>
        <div class="edit_avatar_container">
            <div>
                <img src="../../assets/霍霍.png" alt="">
            </div>

        </div>
        <div class="edit_form_container">
        <div class="edit_form_item">
            <div class="edit_form_item_label">用户名</div>
            <div id="username" class="edit_form_item_input" contenteditable="true" type="text">{{username}}</div>
        </div>

            <div class="edit_form_item">
                <div   class="edit_form_item_label">个性签名</div>
                <div id = "signature" contenteditable="true" class="edit_form_item_input_area" type="text" placeholder="个性签名"></div>
            </div>
            <div class="edit_form_item">
                <div  class="edit_form_item_label">性别</div>                    
                    <div class="radioDiv_input">
                        <input type="radio" v-model="selectGender" name="gender" value="男">男
                    </div>
                    <div class="radioDiv_input">
                        <input type="radio" v-model="selectGender" name="gender" value="女">女
                    </div>
                    <div class="radioDiv_input">
                        <input type="radio" v-model="selectGender" name="gender" value="保密">保密
                    </div>
            </div>

            <div class="edit_form_item_button">
                <button @click="saveInfo">保存</button>
            </div>


            


        </div>

    
    </div>
</template>

<script lang="ts">
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default {
    name: 'InfoEdit',
    data():any {
        return {
            username: "霍霍果",
            signature: "如果真爱有颜色，那一定是绿色",
            gender: "男",
            selectGender: "男",
        };
    },
    methods: {
      // Your methods here
      saveInfo(){
          console.log(this.username);
          this.username = document.getElementById("username")?.innerHTML;
          this.signature = document.getElementById("signature")?.innerHTML;
          this.gender = this.selectGender;
          alert(`${this.username} ${this.signature} `);

      },
      handleUpload(file:any) {
        this.getOssSignature().then((signatureInfo:any) => {
          console.log('获取签名信息成功', signatureInfo);
          let formData = new FormData();
          // const extension = file.name.split('.').pop();
          const extension = file.file.name.split('.').pop();
          const uniqueFilename = uuidv4() + '.' + extension;
          console.log('uniqueFilename', uniqueFilename);
          if (extension !== 'jpg' && extension !== 'png') {
            this.$message({
              message: '只能上传jpg/png文件',
              type: 'error'
            });
            return;
          }
          formData.append('key', signatureInfo.dir + uniqueFilename);
          formData.append('policy', signatureInfo.policy);
          formData.append('OSSAccessKeyId', signatureInfo.accessid);
          formData.append('signature', signatureInfo.signature);
          formData.append('file', file.file);

          axios.post(signatureInfo.host, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          }).then(response => {
            console.log('上传成功', response);
            // 处理上传成功的逻辑
            this.imageUrl = signatureInfo.host + '/' + uniqueFilename;
            this.$message({
              message: '上传成功',
              type: 'success'
            });
          }).catch(error => {
            console.error('上传失败', error);
            // 处理上传失败的逻辑
            this.$message({
              message: '上传失败',
              type: 'error'
            });
          });
        }).catch((error:any) => {
          console.error('获取签名信息失败', error);
          // 处理获取签名信息失败的逻辑
          this.$message({
            message: '获取签名信息失败',
            type: 'error'
          });
        });
      },
      getOssSignature() {
        // 实现获取OSS签名信息的逻辑，返回一个Promise
        // 示例中省略了具体实现
        return new Promise((resolve, reject) => {
          // 假设这是您的服务器端API端点，用于获取OSS签名信息

          this.$axios.get('/oss').then((response:any) => {
            if(response.data) {
              resolve(response.data);
            } else {
              reject('No signature data received');
            }
          }).catch((error:any) => {
            reject(error);
          });
        });
      },
    },
    mounted() {
        // Your mounted hook code here
    }
};
</script>

<style scoped>
hr{
    margin: 0;
    color: #c6c0c0;
}

.main_container_user_title{
    width: auto;
    height: 30px;
    background-color: transparent;
}

.main_container_user_title a{
    color: white;
    text-decoration: none;  
    height: 0.5em;
    text-align: center;
    display: inline-block;
    margin-left: 10px;
    margin-bottom: 10px;
    line-height: 0.5em;
}

ul.pagination li a {
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 0 4px;
  transition: background-color .3s;
}

div.center {
  text-align: center;
  width: 100%;
}

.edit_avatar_container{
    width: 100%;
    height: 180px;
    overflow: hidden;
    margin-top: 20px;
    background-color: transparent;
    display: flex;
    justify-content: center;
}

.edit_avatar_container img{
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 50%;
    background-color:transparent;
}

.edit_form_container{
    width: 100%;
    height: 260px;
    overflow: hidden;
    margin-top: 20px;
    background-color: transparent;
}

.edit_form_item{
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: left;
    background-color: transparent;
}

.edit_form_item_label{
    width: 80px;
    height: 30px;
    text-align: right;
    line-height: 30px;
    margin-left: 20px;
    margin-right: 20px;
    background-color: transparent;
}

.edit_form_item_input{
    width: 500px;
    background-color: transparent;
    color: rgb(0, 0, 0);
    border-radius: 5px;
    border: 1px solid #9c9696;
    margin-left: 20px;
    padding-left: 10px;
    padding-top: 2px;
}

.edit_form_item_input_area{
    width: 500px;
    height: 100px;
    background-color: transparent;
    color: rgb(0, 0, 0);
    border-radius: 5px;
    border: 1px solid #9c9696;
    word-wrap:break-word;  
    word-break:break-all;
    margin-left: 20px;
    padding-left: 10px;
    padding-top: 2px;
}

.radioDiv_input{

    height: 30px;
    background-color: transparent;
    color: white;
    margin-left: 20px;
    align-content: center;
    justify-content: center;
    display: flex;
    line-height: 32px;
}

.edit_form_item_button{
    width: 100%;
    height: 50px;
    margin-top: 10px;
    
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: transparent;
}

.edit_form_item_button button{
    width: 65px;
    height: 40px;
    margin-top: 10px;
    border-radius: 5px;
    cursor: pointer;
    background-color: rgb(136, 146, 205);
}

.edit_form_item_button button:hover{
    background-color: rgb(71,74,88);
    color: rgb(136, 146, 205);
}




</style>