<template>
  <div>
    <div class="main_container_user_title">
      <a>编辑资料</a>
    </div>

    <hr />
    <div class="edit_avatar_container">
      <div>
        <input type="file" @change="avatarUpload" ref="avatarInput" style="display: none;">
        <img @click="triggerFileInput" src="../../assets/霍霍.png" alt="" />
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
          id="signature"
          contenteditable="true"
          class="edit_form_item_input_area"
          type="text"
          placeholder="个性签名"
        ></div>
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
        <button @click="saveInfo">保存</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, inject } from 'vue';
import axios from 'axios';
import store from '../../store';
import { v4 as uuidv4 } from 'uuid';
import { UserInfo } from '../../types';

export default {
  name: 'InfoEdit',
  setup() {
    const username = ref('霍霍果');
    const signature = ref('如果真爱有颜色，那一定是绿色');
    const gender = ref('男');
    const selectGender = ref('男');
    const imageUrl = ref('');
    const api = inject('$api') as any;

    const saveInfo = () => {
      console.log(username.value);
      username.value = document.getElementById('username')?.innerHTML || '';
      signature.value = document.getElementById('signature')?.innerHTML || '';
      gender.value = selectGender.value;
      alert(`${username.value} ${signature.value}`);
    };

    const handleUpload = (file: any) => {
      getOssSignature()
        .then((signatureInfo: any) => {
          console.log('获取签名信息成功', signatureInfo);
          let formData = new FormData();
          const extension = file.name.split('.').pop();
          const uniqueFilename = uuidv4() + '.' + extension;
          console.log('uniqueFilename', uniqueFilename);
          if (extension !== 'jpg' && extension !== 'png') {
            alert('只能上传jpg/png文件');
            return;
          }
          formData.append('key', signatureInfo.dir + uniqueFilename);
          formData.append('policy', signatureInfo.policy);
          formData.append('OSSAccessKeyId', signatureInfo.accessid);
          formData.append('signature', signatureInfo.signature);
          formData.append('file', file);

          axios
            .post(signatureInfo.host, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
              console.log('上传成功', response);
              imageUrl.value = signatureInfo.host + '/' + uniqueFilename;
              alert('上传成功');
            })
            .catch((error) => {
              console.error('上传失败', error);
              alert('上传失败');
            });
        })
        .catch((error: any) => {
          console.error('获取签名信息失败', error);
          alert('获取签名信息失败');
        });
    };

    const getOssSignature = () => {
      return new Promise((resolve, reject) => {
        axios
          .get('/oss')
          .then((response: any) => {
            if (response.data) {
              resolve(response.data);
            } else {
              reject('No signature data received');
            }
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    };

    const avatarUpload = (e: any) => {
      const file = e.target.files[0];
      handleUpload(file);
      console.log('file', file);
    };

    onMounted(() => {
      let userInfo:UserInfo = store.getters.getUserInfo;
      username.value = userInfo.username;
      signature.value = userInfo.signature
        ? userInfo.signature
        : '这个人很懒，什么都没留下';
      gender.value = userInfo.gender;
    });

    return {
      username,
      signature,
      gender,
      selectGender,
      saveInfo,
      handleUpload,
      getOssSignature,
      avatarUpload,
      imageUrl,
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
  color: rgb(153,153,166);
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
  color: rgb(153,153,166);
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
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(136, 146, 205);
}

.edit_form_item_button button:hover {
  background-color: rgb(71, 74, 88);
  color: rgb(136, 146, 205);
}
</style>