<template>
                <div class="main_container_userInfo_container">
                    <div class="main_container_user_avatar_container">
                        <img src="../../assets/霍霍.png" class="main_container_user_avatar" alt="">
                    </div>

                    <div class="main_container_user_info">
                        <div class="main_container_user_info_name">{{ userInfo.username }}</div>
                        <div class="main_container_user_info_id">{{ userInfo.userId }}</div>
                        <p class="main_container_user_info_signature">
                            {{ userInfo.signature }}
                        </p>
                    </div>
                    
                </div>
</template>

<script lang="ts">
export default {
  name: 'UserInfo',
  data() {
    return {
      userInfo:{
        avatar: '霍霍.png',
        account:"1234567890", // "账号" 
        username: '花开富贵',
        userId: '123',
        signature: '个性签名',
        
      }
    };
  },
  methods: {
    // Your methods here
  },
  computed: {
    // Your computed properties here
  },
  mounted() {
    // Your mounted hook code here
  },
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
    background-color: rgb(197, 231, 230);
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
}

.main_container_user_info{
    height: 100%;
    width: 780px;
    background-color: rgb(197, 231, 230);
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
    line-height: 0.8em;
    margin-left: 10px;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    font-size: 0.8em;
}

.main_container_user_info_signature{
    height: 100px;
    line-height:18px;  
    margin-left: 10px;
    margin-top: 12px;
    margin-right: 12px;
    font-size: 0.8em;
    background-color: rgb(197, 231, 230);
    word-wrap:break-word;  
    word-break:break-all;  
}
</style>
