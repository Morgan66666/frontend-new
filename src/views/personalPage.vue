<template>
        <div class="main_container">
            <div class="main_container_sub1">
                <userInfoVue :userInfo ="userInfo"  ></userInfoVue>
            </div>
            <div class="main_container_sub1">
                <div class="main_container_user_function_container" >
                        <div class="main_container_user_function_left">
                            <div class="main_container_user_title"><a>个人中心</a></div>
                        

                                <router-link class="main_container_user_function_left_button" :class="{ active: $route.path === `/personal/${userInfo.userId}/posts` }" :to="`/personal/${userInfo.userId}/posts`" >
                                    <img class="main_icon_svg" src="../assets/icon/time.svg" alt="百度logo">
                                    <a>发帖</a>
                                </router-link>
                            
                            <div v-if="isMaster" class="main_container_user_function_left_button">
                                <img class="main_icon_svg" src="../assets/icon/time.svg" alt="百度logo">
                                <a>收藏</a>
                                
                            </div>
                            <div v-if="isMaster" class="main_container_user_function_left_button">
                                <img class="main_icon_svg" src="../assets/icon/time.svg" alt="百度logo">
                                <a>浏览记录</a>
                            </div>
                            <div v-if="isMaster" class="main_container_user_function_left_button">
                                <img class="main_icon_svg" src="../assets/icon/time.svg" alt="百度logo">
                                <a>购票记录</a>
                            </div>

                            <router-link v-if="isMaster" class="main_container_user_function_left_button" :class="{ active: $route.path === `/personal/${userInfo.userId}/infoEdit` }" :to="`/personal/${userInfo.userId}/infoEdit`">
                                <img class="main_icon_svg" src="../assets/icon/time.svg" alt="百度logo">
                                <a>编辑资料</a>
                            </router-link>

                        </div>
                        <div class="main_container_user_function_right">
                            <router-view></router-view>
                                
                        </div>
                </div>
            </div>
        </div>
</template>

<script lang="ts">
import userInfoVue from '../components/personalComponents/userInfo.vue';
import { ref } from 'vue';
import { getUserInfo } from '../utils/userUtil.vue';
import { useRoute } from 'vue-router';
import store from '../store';

export default {
  name: 'PersonalPage',
  components: { userInfoVue },

setup() {
    const route = useRoute();
    let userId = route.params.userId;
    let isMaster = store.getters.getIsLogin && store.getters.getUser.userId === userId;
    let userInfo = ref( getUserInfo(userId));
    console.log(store.getters.getIsLogin);
    return {userInfo, isMaster};
},
};
</script>

<style scoped>

.main_container{
    width: 100%;
    height: 100%;
    justify-content: center;
    background-color: rgb(245, 245, 245);   
    box-sizing: content-box;
}


.main_container::after {
  content: "";
  display: table;
  clear: both;
}
.main_container_sub1{
    width: 1000px;
    height: auto;
    margin: 0 auto ;
    padding-left: 100px;
    padding-right: 100px;
    background-color: transparent;    
    box-sizing: content-box;
}


.main_container_user_function_container{
    width: 980px;
    height: 800px;
    background-color: transparent;
    margin-top: 10px;
}


.main_container_user_function_left{
    width: 280px;
    height: 300px;
    background-color: rgb(255,255,255);
    display: inline;
    margin-right: 10px;
    float: left;
    border-radius: 8px;
}

.main_container_user_function_left_button{
    width: 280px;
    height: 40px;
    background-color: rgb(255,255,255);
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    color: rgb(255, 255, 255);
}

.main_container_user_function_left_button a{
    color: rgb(0, 0, 0);
    text-decoration: none;  
    height: 0.5em;
    display: inline-block;
    line-height: 0.5em;
}

.main_container_user_function_left_button.active{
    background-color: rgb(71,74,88);
    color: rgb(136, 146, 205);
}

.main_container_user_function_left_button:hover{
    background-color: rgb(71,74,88);
    color: rgb(136, 146, 205);
}

.main_container_user_function_right{
    width: 660px;
    height: auto;
    min-height: 300px;
    background-color: rgb(255,255,255);
    display: inline;
    float: right;
    border-radius: 8px;
    padding: 10px;
}

.main_container_user_title{
    width: auto;
    height: 30px;
    background-color: transparent;
    margin-top: 10px; 
    border-bottom: 1px solid rgb(75, 78, 94);
}

.main_container_user_title a{
    color: rgb(0, 0, 0);
    text-decoration: none;  
    height: 0.5em;
    text-align: center;
    display: inline-block;
    margin-left: 10px;
    margin-bottom: 10px;
    line-height: 0.5em;
}

.main_icon_svg{
    width: 20px;
    height: 20px;
    margin-left: 50px;
    margin-right: 10px;
    display: inline-block;
}

.main_container_mainMessage_message_card{
    width: 100%;
    height: 300px;
    background-color: rgb(255, 255, 255);
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid rgb(162, 160, 160);
}

.main_container_mainMessage_message_card:hover{
    background-color: rgb(235, 195, 195);
}


.main_userinfo{
    width: 100%;
    height: 20px;
    background-color: rgb(183, 144, 144);
    align-items: center;
}

.main_card_title{
    line-height: 20px;
    margin-top: 8px;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    font-weight: bold;
}
    


.main_card_content{
    line-height: 18px;
    margin-top: 8px;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    color: #919090;
}

.main_card_img{
    width: 30%;
    height: 180px;
    background-color: rgb(183, 144, 144);
    align-items: center;
    margin-top: 8px;
    margin-left: 10px;
    display: inline-block;
}

</style>
