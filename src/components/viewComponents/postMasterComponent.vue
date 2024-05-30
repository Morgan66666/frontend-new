<template>
    <div class="main_container_mainMessage_rightMessage_card">
        <div class="post_master">
            <img class="post_master_avatar" :src="userInfo.avatar" alt="" />
            <div class="post_master_username" @click="jumpToPersonalPage">{{ userInfo.userName }}</div>
            <div class="post_master_level" @click="jumpToPersonalPage">{{ userInfo.level }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { UserInfo } from '../../types'
import { useRouter } from "vue-router";

const router = useRouter()
const props = defineProps({
    userInfo: {
        type: Object as () => UserInfo,
        required: true
    }
})

const jumpToPersonalPage = () => {
  router.push({ path: `/personal/${props.userInfo.userId}` })
    console.log('jump to personal page')
}

</script>

<style scoped>
.post_master_avatar{
  width: 50px;
  height: 50px;
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  margin: auto;
}

.post_master_username{
  width: 100%;
  height: 20px;
  background-color: transparent;
  font-size: 1em;
  font-weight: bold;
  margin: auto;
  text-align: center;
}

.post_master_username:hover{
  color: rgb(255,191,0);
  cursor: pointer;
}



.post_master_level{
  width: 60px;
  height: 20px;
  background-color: rgb(255,191,0);
  font-size: 0.8em;
  margin: 10px;
  text-align: center;
  border-radius: 5px;
  line-height: 20px;
}

</style>