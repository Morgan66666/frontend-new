<template>
  <div>
    <div class="main_container_user_title">
      <a>编辑资料</a>
    </div>
    <div>
<v-dialog v-model="dialog" width="500">
  <v-card>
    <v-card-title class="headline">上传图片</v-card-title>
    <v-card-text>
      <div
        style="border: 1px dashed #ccc; padding: 20px; text-align: center;"
        id="dropzone"
        @dragover.prevent
        @dragenter.prevent
        @drop="onDrop"
      >
        拖拽图片到这里上传
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <input type="file" ref="fileInput" style="display: none" @change="onFileSelected" />
      <v-btn color="blue darken-1" @click="selectFile">选择文件</v-btn>
      <v-btn color="green darken-1" @click="dialog = false">关闭</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
    </div>

    <hr />
    <div class="edit_avatar_container">
      <div>
        <input
          type="file"
          @change="avatarUpload"
          ref="avatarInput"
          style="display: none"
        />
        <img @click="triggerFileInput" :src=imageUrl  alt="" />
      </div>
    </div>
    <div class="edit_form_container">
      <div class="edit_form_item">
        <div class="edit_form_item_label">用户名</div>
        <div
          id="username"
          class="edit_form_item_input"
          contenteditable="true"
          type="text"
        >
          {{ username }}
        </div>
      </div>

      <div class="edit_form_item">
        <div class="edit_form_item_label">个性签名</div>
        <div
          id="intro"
          contenteditable="true"
          class="edit_form_item_input_area"
          type="text"
          placeholder="个性签名"
        >{{intro}}</div>
      </div>
      <div class="edit_form_item">
        <div class="edit_form_item_label">性别</div>
        <div class="radioDiv_input">
          <input
            type="radio"
            v-model="selectGender"
            name="gender"
            value="男"
          />男
        </div>
        <div class="radioDiv_input">
          <input
            type="radio"
            v-model="selectGender"
            name="gender"
            value="女"
          />女
        </div>
        <div class="radioDiv_input">
          <input
            type="radio"
            v-model="selectGender"
            name="gender"
            value="保密"
          />保密
        </div>
      </div>
  
      <div class="edit_form_item_button">
<button @click="showChangePasswordDialog = true">修改密码</button>
  <button @click="saveInfo">保存</button>


  <v-dialog max-width="500" v-model="showChangePasswordDialog" persistent>
    <v-card>
  <!--对话框的标题-->
  <v-toolbar dense dark color="rgb(152, 235, 239)">
    <v-toolbar-title>修改密码</v-toolbar-title>
  </v-toolbar>
  <!--对话框的内容，表单-->
  <v-card-text class="px-5">
    <v-text-field
      v-model="password"
      label="新密码"
      type="password"
      outlined
      color="light-blue"
      hide-details
    ></v-text-field>
    <v-text-field
      v-model="password1"
      label="再次输入"
      type="password"
      outlined
      color="light-blue"
      hide-details
    ></v-text-field>
  </v-card-text>
  <!--确定和取消按钮-->
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="green darken-1"  @click="changePassword">确定</v-btn>
    <v-btn color="red darken-1"  @click="showChangePasswordDialog = false">取消</v-btn>
  </v-card-actions>
</v-card>
  </v-dialog>
</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, inject, getCurrentInstance } from "vue";
import axios from "axios";
import store from "../../store";
import { v4 as uuidv4 } from "uuid";
import { UserInfo } from "@/types";
import { getUserInfo } from "@/utils/userUtil.ts";

export default {
  name: "InfoEdit",
  userInfo: {
    type: Object,
    required: true,
  },

  setup() {

    let userInfo = store.getters.getUserInfo
    const username = ref(userInfo.userName);
    const intro = ref(userInfo.intro);
    const gender = ref(userInfo.gender);
    const selectGender = ref("男");
    const imageUrl = ref(userInfo.avatar);
    const api = inject("$api") as any;
    const dialog = ref(false);
    const instance = getCurrentInstance();
    const proxy:any = instance?.proxy;
    let showChangePasswordDialog = ref(false);
    let password = ref("")
    let password1 = ref("")
    const changePassword = () =>  {
    // 在这里添加修改密码的逻辑
      api.user.updateUserPassword({password: password.value}).then((res:any) => {

        if(password.value != password.value){
          proxy.$message.error("两次密码不同")
          return
        }
        if(res?.code == 403||res?.code == 404){
          proxy.$message.error("与旧密码相同")
        }else{
          proxy.$message.success("修改成功")
        }
      })
       
      showChangePasswordDialog.value = false
    }

    const fileInput = ref<HTMLInputElement | null>(null);

    const selectFile = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    const handleFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        console.log('Selected file:', file);
      }
    };

    const saveInfo = () => {
      console.log(username.value);
      username.value = document.getElementById("username")?.innerHTML || "";
      intro.value = document.getElementById("intro")?.innerHTML || "";
      gender.value = selectGender.value;
      proxy.$message.success(`${username.value} ${intro.value}`);
      let userId = store.getters.getUserInfo.userId;
      let newUserInfo = {
        userId : userId,
        userName: username.value,
        intro: intro.value,
        gender: gender.value,
        avatar: imageUrl.value,
      }

      console.log("newUserInfo", newUserInfo);

      api.user.updateUser(newUserInfo).then((response: any) => {
        console.log("更新用户信息成功", response);
        proxy.$message.success("更新用户信息成功");
        // 重新登录
        getUserInfo(userId).then((res:any)  => {
          console.log("重新登录成功", res);
          store.dispatch("LoginIn", res);
        })
      }).catch((error: any) => {
        console.error("更新用户信息失败", error);
        proxy.$message.success("更新用户信息失败");
      });
    };

    const handleUpload = (file: any) => {
      getOssSignature()
        .then((signatureInfo: any) => {
          console.log("获取签名信息成功", signatureInfo);
          let formData = new FormData();
          const extension = file.name.split(".").pop();
          const uniqueFilename = uuidv4() + "." + extension;
          console.log("uniqueFilename", uniqueFilename);
          if (extension !== "jpg" && extension !== "png") {
            proxy.$message.error("只能上传jpg/png文件");
            return;
          }
          formData.append("key", signatureInfo.dir + uniqueFilename);
          formData.append("policy", signatureInfo.policy);
          formData.append("OSSAccessKeyId", signatureInfo.accessid);
          formData.append("signature", signatureInfo.signature);
          formData.append("file", file);

          axios
            .post(signatureInfo.host, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
              console.log("上传成功", response);
              imageUrl.value = signatureInfo.host + "/" + uniqueFilename;
              
              proxy.$message.success("上传成功");
            })
            .catch((error) => {
              console.error("上传失败", error);
              proxy.$message.success("上传失败");
            });
        })
        .catch((error: any) => {
          console.error("获取签名信息失败", error);
          proxy.$message.error("获取签名信息失败");
        });
    };

    const getOssSignature = () => {
      try {
        const response = api.oss.getSignature();
        if (response) {
          console.log("获取签名信息成功", response);
          return response;
        } else {
          throw new Error("获取签名信息失败");
        }
      } catch (error) {
        throw error;
      }
    };

    const avatarUpload = (e: any) => {
      const file = e.target.files[0];
      handleUpload(file);
      console.log("file", file);
    };

    const onDrop = (e: any) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (!files.length) return;
      handleUpload(files[0]);
      console.log(files);
      dialog.value = false;
    };

    const onFileSelected = (e: any) => {
      if (!e.target.files.length) return;
      const file = e.target.files[0];
      handleUpload(file);
      dialog.value = false;
    };

    const triggerFileInput = () => {
      dialog.value = true;
    };

    onMounted(() => {
      let userInfo: UserInfo = store.getters.getUserInfo;
      username.value = userInfo.userName;
      intro.value = userInfo.intro
        ? userInfo.intro
        : "这个人很懒，什么都没留下";
      gender.value = userInfo.gender;
    });

    return {
      userInfo,
      username,
      intro,
      gender,
      selectGender,
      saveInfo,
      handleUpload,
      getOssSignature,
      avatarUpload,
      imageUrl,
      dialog,
      onDrop,
      triggerFileInput,
      onFileSelected,
      fileInput,
      selectFile,
      handleFileChange,
      changePassword,
      showChangePasswordDialog,
      password,
      password1

    };
  },
};
</script>
<style scoped>
hr {
  margin: 0;
  color: #c6c0c0;
}

.main_container_user_title {
  width: auto;
  height: 30px;
  background-color: transparent;
}

.main_container_user_title a {
  color: rgb(0, 0, 0);
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
  transition: background-color 0.3s;
}

div.center {
  text-align: center;
  width: 100%;
}

.edit_avatar_container {
  width: 100%;
  height: 180px;
  overflow: hidden;
  margin-top: 20px;
  background-color: transparent;
  display: flex;
  justify-content: center;
}

.edit_avatar_container img {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #9f9f9f;
  background-color: transparent;
}

.edit_form_container {
  width: 100%;
  height: 260px;
  overflow: hidden;
  margin-top: 20px;
  background-color: transparent;
}

.edit_form_item {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: left;
  background-color: transparent;
}

.edit_form_item_label {
  width: 80px;
  height: 30px;
  text-align: right;
  line-height: 30px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: transparent;
  color: rgb(153, 153, 166);
}

.edit_form_item_input {
  width: 500px;
  background-color: transparent;
  color: rgb(0, 0, 0);
  border-radius: 5px;
  border: 1px solid #9c9696;
  margin-left: 20px;
  padding-left: 10px;
  padding-top: 2px;
}

.edit_form_item_input_area {
  width: 500px;
  height: 100px;
  background-color: transparent;
  color: rgb(0, 0, 0);
  border-radius: 5px;
  border: 1px solid #9c9696;
  word-wrap: break-word;
  word-break: break-all;
  margin-left: 20px;
  padding-left: 10px;
  padding-top: 2px;
}

.radioDiv_input {
  height: 30px;
  background-color: transparent;
  color: rgb(153, 153, 166);
  margin-left: 20px;
  align-content: center;
  justify-content: center;
  display: flex;
  line-height: 32px;
}

.edit_form_item_button {
  width: 100%;
  height: 50px;
  margin-top: 10px;

  display: flex;
  justify-content: center;
  align-content: center;
  background-color: transparent;
}

.edit_form_item_button button {
  width: 65px;
  height: 40px;
  padding: 5px;
  margin-top: 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(152, 235, 239)
}

.edit_form_item_button button:hover {
  background-color: rgb(205, 231, 234);
}
</style>