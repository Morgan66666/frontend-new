<template>
                <div class="main_container_userInfo_container">
                    <div class="main_container_user_avatar_container">
                        <img :src=userInfo.avatar class="main_container_user_avatar" alt="">
                    </div>

                    <div class="main_container_user_info">
                        <div class="main_container_user_info_name">{{ userInfo.userName }}</div>
                        <div class="main_container_user_info_id">ID: {{ userInfo.userId }}</div>
                        <p class="main_container_user_info_signature">
                            {{ userInfo.intro }}
                        </p>
                    </div>
                    
                </div>
</template>

<script lang="ts">
import { ref } from 'vue';



export default {
  name: 'UserInfo',
  props:{
      userInfo: {
          type: Object,
          required: true,
      }

  },
//   setup(props:any) {
    
//     console.log("信息展示卡",userInfo.value);
//     return {userInfo};
//   },

};
</script>

<style scoped>
    .main_container_userInfo_container{
    width: 980px;
    height: 200px;
    background-color: rgb(247,248,252);
    margin-top: 20px;
    border-radius: 5px;
}

.main_container_user_avatar_container{
    height: 100%;
    width: 200px;
    background-color: rgb(255,255,255);
    display: inline;
    float: left;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}

.main_container_user_avatar{
    border-radius: 50%;
    overflow: hidden;
    width: 150px;
    height: 150px;
    margin-top: 20px;
    margin-left: 20px;
    border: 1px solid #9f9f9f;
}

.main_container_user_info{
    height: 100%;
    width: 780px;
    background-color: rgb(255,255,255);
    display: inline;
    float: right;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}

.main_container_user_info_name{
    line-height: 2em;
    margin-top: 8px;
    margin-left: 10px;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    font-weight: bold;
    font-size: 2em;
    
}

.main_container_user_info_id{
    line-height: 1.1em;
    margin-left: 10px;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    font-size: 1.1em;
}

.main_container_user_info_signature{
    height: 100px;
    line-height:18px;  
    margin-left: 10px;
    margin-top: 12px;
    margin-right: 12px;
    font-size: 0.8em;
    background-color: rgb(255,255,255);
    word-wrap:break-word;  
    word-break:break-all;  
}
</style>
