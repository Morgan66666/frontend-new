<template>
  <div>
    <el-table :data="activities" style="width: 100%">
      <el-table-column prop="activityId" label="活动ID" width="80"></el-table-column>
      <el-table-column prop="title" label="活动标题" width="150"></el-table-column>
      <el-table-column prop="activityBeginTime" label="活动开始时间" width="180"></el-table-column>
      <el-table-column prop="activityEndTime" label="活动结束时间" width="180"></el-table-column>
      <el-table-column prop="capacity" label="参与人数上限" width="120"></el-table-column>
      <el-table-column prop="participantsCount" label="参与人数" width="120"></el-table-column>
      <el-table-column prop="location" label="活动地点" width="150"></el-table-column>
      <el-table-column prop="type" label="活动类型" width="120"></el-table-column>
      <el-table-column prop="organizerId" label="组织者ID" width="120"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="status" label="活动状态" width="100"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.activityId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑活动的对话框 -->
    <el-dialog :title="dialogTitle" v-model:visible="dialogVisible">
      <el-form :model="form">
        <el-form-item label="活动标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="预订开始时间">
          <el-date-picker v-model="form.bookBeginTime" type="datetime" placeholder="选择预订开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="预订结束时间">
          <el-date-picker v-model="form.bookEndTime" type="datetime" placeholder="选择预订结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动开始时间">
          <el-date-picker v-model="form.activityBeginTime" type="datetime" placeholder="选择活动开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束时间">
          <el-date-picker v-model="form.activityEndTime" type="datetime" placeholder="选择活动结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="参与人数上限">
          <el-input v-model="form.capacity"></el-input>
        </el-form-item>
        <el-form-item label="门票价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="活动地点">
          <el-input v-model="form.location"></el-input>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item label="活动状态">
          <el-input v-model="form.status"></el-input>
        </el-form-item>

        <el-form-item label="活动内容">
          <el-input type="textarea" v-model="form.content"></el-input>
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
import { ActivityDetail } from '@/types';

const activities = ref<ActivityDetail[]>([]);
const dialogVisible = ref(false);
const dialogTitle = ref('');
const form = ref<Partial<ActivityDetail>>({});

// 获取活动列表（假设从API获取）
const fetchActivities = async () => {
  try {
    // 假设API返回活动列表
    activities.value = [
      // 示例活动数据
      {
        activityId: 1,
        title: '示例活动',
        content: '这是一个示例活动内容',
        bookBeginTime: '2024-06-01T08:00:00',
        bookEndTime: '2024-06-01T18:00:00',
        activityBeginTime: '2024-06-02T08:00:00',
        activityEndTime: '2024-06-02T18:00:00',
        capacity: 100,
        participantsCount: 50,
        price: 100,
        location: '示例地点',
        type: '示例类型',
        organizerId: 1,
        createTime: '2024-05-01T08:00:00',
        status: '1',
        img: '',
        description: '示例描述'
      },
    ];
  } catch (error) {
    ElMessage.error('获取活动列表失败');
  }
};

// 初始化时获取活动列表
fetchActivities();

const handleEdit = (activity: ActivityDetail) => {
  form.value = { ...activity };
  dialogTitle.value = '编辑活动';
  dialogVisible.value = true;
};

const handleDelete = async (activityId: number) => {
  try {
    // 假设调用API删除活动
    activities.value = activities.value.filter(activity => activity.activityId !== activityId);
    ElMessage.success('删除成功');
  } catch (error) {
    ElMessage.error('删除失败');
  }
};

const handleSave = async () => {
  try {
    // 编辑活动，假设调用API更新活动
    const index = activities.value.findIndex(activity => activity.activityId === form.value.activityId);
    if (index !== -1) {
      activities.value[index] = { ...form.value } as ActivityDetail;
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
