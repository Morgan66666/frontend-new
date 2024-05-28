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
      <el-table-column prop="status" label="活动状态" width="100">
        <template #default="scope">
          <el-tag :type="getStatusTagType(scope.row.status)">
            {{ getStatusText(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" type="success" @click="openApprovalDialog(scope.row)">审批</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 审批活动的对话框 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible">
      <el-form :model="selectedActivity">
        <el-form-item label="活动ID">
          <el-input v-model="selectedActivity.activityId" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动标题">
          <el-input v-model="selectedActivity.title" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input v-model="selectedActivity.description" disabled></el-input>
        </el-form-item>
        <el-form-item label="预订开始时间">
          <el-date-picker v-model="selectedActivity.bookBeginTime" type="datetime" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="预订结束时间">
          <el-date-picker v-model="selectedActivity.bookEndTime" type="datetime" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="活动开始时间">
          <el-date-picker v-model="selectedActivity.activityBeginTime" type="datetime" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束时间">
          <el-date-picker v-model="selectedActivity.activityEndTime" type="datetime" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="参与人数上限">
          <el-input v-model="selectedActivity.capacity" disabled></el-input>
        </el-form-item>
        <el-form-item label="门票价格">
          <el-input v-model="selectedActivity.price" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动地点">
          <el-input v-model="selectedActivity.location" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-input v-model="selectedActivity.type" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动状态">
          <el-input v-model="selectedActivity.status" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动内容">
          <el-input type="textarea" v-model="selectedActivity.content" rows="10" disabled></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="danger" @click="handleReject">拒绝</el-button>
        <el-button type="primary" @click="handleApprove">同意</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { ActivityDetail } from '../../types';

const activities = ref<ActivityDetail[]>([]);
const dialogVisible = ref(false);
const dialogTitle = ref('活动审批');
const selectedActivity = ref<Partial<ActivityDetail>>({});

// 获取活动列表（假设从API获取）
const fetchActivities = async () => {
  try {
    // 假设API返回活动列表
    activities.value = [
      // 示例活动数据
      {
        activityId: 1,
        title: '示例活动',
        description: '示例描述',
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
        status: 'pending',
        img: '',
        content: '<p>这是一个示例活动内容，包含HTML标签</p>',
      },
      {
        activityId: 2,
        title: '另一个活动',
        description: '另一个示例描述',
        bookBeginTime: '2024-07-01T08:00:00',
        bookEndTime: '2024-07-01T18:00:00',
        activityBeginTime: '2024-07-02T08:00:00',
        activityEndTime: '2024-07-02T18:00:00',
        capacity: 200,
        participantsCount: 150,
        price: 200,
        location: '另一个地点',
        type: '另一种类型',
        organizerId: 2,
        createTime: '2024-06-01T08:00:00',
        status: 'approved',
        img: '',
        content: '<p>这是另一个示例活动内容，包含HTML标签</p>',
      },
    ];
  } catch (error) {
    ElMessage.error('获取活动列表失败');
  }
};

// 初始化时获取活动列表
fetchActivities();

const getStatusText = (status: string) => {
  switch (status) {
    case 'approved':
      return '已批准';
    case 'rejected':
      return '已拒绝';
    case 'pending':
    default:
      return '待审批';
  }
};

const getStatusTagType = (status: string) => {
  switch (status) {
    case 'approved':
      return 'success';
    case 'rejected':
      return 'danger';
    case 'pending':
    default:
      return 'warning';
  }
};

const openApprovalDialog = (activity: ActivityDetail) => {
  selectedActivity.value = { ...activity };
  dialogTitle.value = `审批活动: ${activity.title}`;
  dialogVisible.value = true;
};

const handleApprove = () => {
  if (selectedActivity.value.activityId !== undefined) {
    approveActivity(selectedActivity.value.activityId);
  }
};

const handleReject = () => {
  if (selectedActivity.value.activityId !== undefined) {
    rejectActivity(selectedActivity.value.activityId);
  }
};

const approveActivity = async (activityId: number) => {
  try {
    // 假设调用API批准活动
    const activity = activities.value.find((activity) => activity.activityId === activityId);
    if (activity) {
      activity.status = 'approved';
      ElMessage.success('活动已批准');
      dialogVisible.value = false;
    }
  } catch (error) {
    ElMessage.error('批准活动失败');
  }
};

const rejectActivity = async (activityId: number) => {
  try {
    // 假设调用API拒绝活动
    const activity = activities.value.find((activity) => activity.activityId === activityId);
    if (activity) {
      activity.status = 'rejected';
      ElMessage.success('活动已拒绝');
      dialogVisible.value = false;
    }
  } catch (error) {
    ElMessage.error('拒绝活动失败');
  }
};
</script>

<style scoped>
/* 根据需要添加样式 */
</style>
