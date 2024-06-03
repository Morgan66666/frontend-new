<template>
  <div class="post-manager" ref="postManager">
    <el-input
      v-model="searchQuery"
      placeholder="搜索帖子标题"
      class="search-box"
      @change="fetchPosts"
      clearable
    >
      <template #prefix>
        <el-icon><search /></el-icon>
      </template>
    </el-input>

    <el-table v-if="posts.length > 0" :data="posts" :style="{ width: `${tableWidth}px` }">
      <el-table-column prop="postId" label="帖子ID" align="center" :width="columnWidths.postId"></el-table-column>
      <el-table-column prop="title" label="标题" :width="columnWidths.title" align="center"></el-table-column>
      <el-table-column label="操作" :width="columnWidths.actions" align="center">
        <template #default="scope">
          <el-button size="small" type="info" @click="clickTitle(scope.row.postId)">进入</el-button>          
          <el-button size="small" type="danger" @click="handleDelete(scope.row.postId)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, onUnmounted, inject} from 'vue';
import { ElMessage } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import { Post } from '@/types'; // 假设你的类型定义文件在 types 文件夹中
import moment from 'moment';

const posts = ref<Post[]>([]);
const searchQuery = ref('');
const tableWidth = ref(0);
const api = inject("$api") as any;
const router = inject("$router") as any
const columnWidths = ref({
  postId: 0,
  title: 0,
  actions: 0
});
const postManager = ref<HTMLElement | null>(null);

const fetchPosts = async () => {
  // 预设一些示例数据
  posts.value = []
  let form = {
    pageSize: 100,
    title: searchQuery.value
  }
  api.post.getPosts(form).then((res:any) => {
    console.log(res)
    res.records.forEach((item :any) => {
      posts.value.push({
        postId: item.postId,
        title: item.title,
        body: item.body,
        date: moment(item.createTIme).format("YYYY-MM-DD HH:mm:ss"),
        isLiked: item.isLiked,
        likes:item.likes,
        type:item.type
      })
      
    })
    console.log(posts.value)
  })



  // posts.value = [
  //   { postId: 1, title: '示例帖子1', body: '内容1', date: '2023-01-01', isLiked: 0, likes: 0, type: 'type1'},
  //   { postId: 2, title: '示例帖子2', body: '内容2', date: '2023-01-02', isLiked: 0, likes: 0, type: 'type2' },
  //   { postId: 3, title: '示例帖子3', body: '内容3', date: '2023-01-03', isLiked: 0, likes: 0, type: 'type3'},
  //   { postId: 4, title: '示例帖子4', body: '内容4', date: '2023-01-04', isLiked: 0, likes: 0, type: 'type4'},
  //   // 更多示例数据
  // ];
};

const clickTitle = (postId:any) =>{
  router.push({ path: `/post/${postId}`})
} 

const handleDelete = async (postId: number) => {
  try {
    // 删除本地数据中的帖子
    posts.value = posts.value.filter(post => post.postId !== postId);
    api.admin.banPost({postId: postId}).then((res:any) => {
      ElMessage.success('删除成功');
      console.log("删除成功", res);
    })

    
  } catch (error) {
    ElMessage.error('删除失败');
  }
};

const calculateColumnWidths = () => {
  if (postManager.value) {
    tableWidth.value = postManager.value.clientWidth;
    const totalWidth = tableWidth.value;
    const postIdWidth = Math.floor(totalWidth * 0.15);
    const actionsWidth = Math.floor(totalWidth * 0.15);
    const titleWidth = totalWidth - postIdWidth - actionsWidth;

    columnWidths.value = {
      postId: postIdWidth,
      title: titleWidth,
      actions: actionsWidth
    };
  }
};

onMounted(() => {
  fetchPosts();
  calculateColumnWidths();
  window.addEventListener('resize', calculateColumnWidths);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculateColumnWidths);
});
</script>

<style scoped>
.post-manager {
  width: 100%;
  padding: 20px;
}

.search-box {
  margin-bottom: 20px;
  width: 100%;
}

</style>
