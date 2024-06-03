<template>
  <div class="api-manager">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>生成式AI API Key管理</span>
      </div>
      <el-form :model="form" ref="formRef" label-width="120px">
        <el-form-item label="API Key" :rules="[{ required: true, message: '请输入API Key', trigger: 'blur' }]">
          <el-input v-model="form.apiKey" show-password placeholder="请输入API Key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {inject, ref} from 'vue';
import { ElMessage } from 'element-plus';

interface ApiDetail {
  apiKey: string;
}

const formRef = ref();
const form = ref<ApiDetail>({
  apiKey: ''
});

const api:any = inject("$api");

const handleSubmit = async () => {
  try {
    api.ai.updateAPI(form.value).then((res:any) => {
      console.log(res)
    });

    ElMessage.success('API Key保存成功');
  } catch (error) {
    ElMessage.error('请填写API Key');
  }
};
</script>

<style scoped>
.api-manager {
  width: 100%;
  padding: 20px;
}

.box-card {
  margin: 20px 0;
}
</style>
