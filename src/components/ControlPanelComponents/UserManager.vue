<template>
  <div>
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="userId" label="用户ID" width="150"></el-table-column>
      <el-table-column prop="username" label="用户名" width="150"></el-table-column>
      <el-table-column prop="gender" label="性别" width="100"></el-table-column>
      <el-table-column prop="level" label="级别" width="100"></el-table-column>
      <el-table-column prop="birth" label="生日" width="150"></el-table-column>
      <el-table-column prop="signature" label="个性签名" width="200"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.userId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑用户信息的对话框 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible">
      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.gender"></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <el-input v-model="form.level"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="form.birth" type="date" placeholder="选择生日"></el-date-picker>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input type="textarea" v-model="form.signature" rows="3"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { UserInfo } from '@/types';

const users = ref<UserInfo[]>([]);
const dialogVisible = ref(false);
const dialogTitle = ref('');
const form = ref<Partial<UserInfo>>({});

// 获取用户列表（假设从API获取）
const fetchUsers = async () => {
  try {
    // 假设API返回用户列表
    users.value = [
      {
        avatar: 'https://example.com/avatar1.png',
        username: '用户1',
        gender: '男',
        level: '高级',
        userId: '1',
        signature: '这是用户1的个性签名',
        birth: '1990-01-01',
      },
      {
        avatar: 'https://example.com/avatar2.png',
        username: '用户2',
        gender: '女',
        level: '中级',
        userId: '2',
        signature: '这是用户2的个性签名',
        birth: '1992-02-02',
      },
    ];
  } catch (error) {
    ElMessage.error('获取用户列表失败');
  }
};

// 初始化时获取用户列表
fetchUsers();

const handleEdit = (user: UserInfo) => {
  form.value = { ...user };
  dialogTitle.value = '编辑用户信息';
  dialogVisible.value = true;
};

const handleDelete = async (userId: string) => {
  try {
    // 假设调用API删除用户
    users.value = users.value.filter(user => user.userId !== userId);
    ElMessage.success('删除成功');
  } catch (error) {
    ElMessage.error('删除失败');
  }
};

const handleSave = async () => {
  try {
    // 编辑用户信息，假设调用API更新用户
    const index = users.value.findIndex(user => user.userId === form.value.userId);
    if (index !== -1) {
      users.value[index] = { ...form.value } as UserInfo;
    }
    dialogVisible.value = false;
    ElMessage.success('保存成功');
  } catch (error) {
    ElMessage.error('保存失败');
  }
};
</script>

<style scoped>
/* 根据需要添加样式 */
</style>
