<template>
    <div class="main_container_mainMessage_rightMessage_card">
        <div class="post_master">
            <img class="post_master_avatar" :src="userInfo.avatar" alt="" />
            <div class="post_master_username">{{ userInfo.username }}</div>
            <div class="post_master_level">{{ userInfo.level }}</div>
        </div>
    </div>
</template>

<script lang="ts">
export default {

    props: {
        userInfo: {
            type: Object,
            required: true
        }
    },
    setup() {

    },
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

.post_master_level{
  width: 60px;
  height: 20px;
  background-color: rgb(255,191,0);
  font-size: 0.8em;
  margin: 10px;
  text-align: center;
  border-radius: 5px;
}

</style>