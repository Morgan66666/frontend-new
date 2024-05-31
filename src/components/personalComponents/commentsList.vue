<template>
  <div>
    <div class="main_container_user_title">
        <a>帖子记录</a>
        <div style="height: 6px;"></div>
        
        <postComment v-for="item in postsShow" :comment="item" v-bind:key="item.postId"></postComment>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted} from 'vue'
import { useRouter } from 'vue-router';
import postComment from '../homePageComponents/postComment.vue'


const api:any = inject('$api');
let postsShow = ref([])
const router:any = inject("$router") as ReturnType<typeof useRouter>;
const userId = router.currentRoute.value.params.userId; 
onMounted(() => {
  api.post.getPosts({userId: userId}).then((res: any) => {
    postsShow.value.push(...res.records);
  });
})

</script>


<style scoped>

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

</style>
