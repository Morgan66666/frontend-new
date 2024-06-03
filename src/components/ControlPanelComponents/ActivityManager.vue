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
    <el-dialog :title="dialogTitle" v-model="dialogVisible">
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
import {inject, ref, watch} from 'vue';
import { ElMessage } from 'element-plus';
import { ActivityDetail } from '@/types';
import {convertLocalToTimestamp, convertTimestampToLocal, isValidTimestamp} from "@/utils/timeUtil.ts";

const activities = ref<ActivityDetail[]>([]);
const dialogVisible = ref(false);
const dialogTitle = ref('');
const form = ref<ActivityDetail>({
  activityBeginTime: "",
  activityEndTime: "",
  activityId: 0,
  bookBeginTime: "",
  bookEndTime: "",
  capacity: 0,
  content: "",
  description: "",
  img: "",
  location: "",
  organizerId: 0,
  participantsCount: 0,
  price: 0,
  status: "",
  title: "",
  type: ""
});

const api:any = inject("$api");

// 获取活动列表（假设从API获取）
const fetchActivities = async () => {
  try {
    // 假设API返回活动列表
    // activities.value = [
    //   // 示例活动数据
    //   {
    //     activityId: 1,
    //     title: '示例活动',
    //     content: '这是一个示例活动内容',
    //     bookBeginTime: '2024-06-01T08:00:00',
    //     bookEndTime: '2024-06-01T18:00:00',
    //     activityBeginTime: '2024-06-02T08:00:00',
    //     activityEndTime: '2024-06-02T18:00:00',
    //     capacity: 100,
    //     participantsCount: 50,
    //     price: 100,
    //     location: '示例地点',
    //     type: '示例类型',
    //     organizerId: 1,
    //     createTime: '2024-05-01T08:00:00',
    //     status: '1',
    //     img: '',
    //     description: '示例描述'
    //   },
    // ];
    let form = {
      pageSize: 1000,
      pageNum: 1
    }
    api.activity.getActivities(form).then((res: any) => {
      if (res.code==undefined) {
        activities.value = res.records
      }
      else console.log(res)

    })
  } catch (error) {
    ElMessage.error('获取活动列表失败');
  }
};

// 初始化时获取活动列表
fetchActivities();

watch(activities, () => {
  activities.value.forEach((activity: any) => {
    if (isValidTimestamp(activity.activityBeginTime)) {
      activity.activityBeginTime = convertTimestampToLocal(activity.activityBeginTime)
    }
    if (isValidTimestamp(activity.activityEndTime)) {
      activity.activityEndTime = convertTimestampToLocal(activity.activityEndTime)
    }
    if (isValidTimestamp(activity.bookBeginTime)) {
      activity.bookBeginTime = convertTimestampToLocal(activity.bookBeginTime)
    }
    if (isValidTimestamp(activity.bookEndTime)) {
      activity.bookEndTime = convertTimestampToLocal(activity.bookEndTime)
    }
    if (isValidTimestamp(activity.createTime)) {
      activity.createTime = convertTimestampToLocal(activity.createTime)
    }
  })
})

const handleEdit = (activity: ActivityDetail) => {

  form.value = { ...activity };
  console.log("aadsdaads",form.value)

  dialogTitle.value = '编辑活动';
  dialogVisible.value = true;


};

const handleDelete = async (activityId: number) => {
  try {
    // 假设调用API删除活动
    api.activity.deleteActivity({activityId: activityId}).then((res: any) => {
      if (res.code == undefined) {
        activities.value = activities.value.filter(activity => activity.activityId !== activityId);
      }
      else console.log(res)
    })
    ElMessage.success('删除成功');
  } catch (error) {
    ElMessage.error('删除失败');
  }
};

const handleSave = async () => {
  dialogVisible.value = false;
  try {
    // 编辑活动，假设调用API更新活动
    // const index = activities.value.findIndex(activity => activity.activityId === form.value.activityId);
    if (!isValidTimestamp(form.value.activityBeginTime)) {
      form.value.activityBeginTime = convertLocalToTimestamp(<string>form.value.activityBeginTime).toString()
    }
    if (!isValidTimestamp(form.value.activityEndTime)) {
      form.value.activityEndTime = convertLocalToTimestamp(<string>form.value.activityEndTime).toString()
    }
    if (!isValidTimestamp(form.value.bookBeginTime)) {
      form.value.bookBeginTime = convertLocalToTimestamp(<string>form.value.bookBeginTime).toString()
    }
    if (!isValidTimestamp(form.value.bookEndTime)) {
      form.value.bookEndTime = convertLocalToTimestamp(<string>form.value.bookEndTime).toString()
    }
    if (!isValidTimestamp(form.value.createTime)) {
      form.value.createTime = convertLocalToTimestamp(<string>form.value.createTime).toString()
    }



    console.log("activity",form.value)


    try {
      api.activity.updateActivity(form.value).then((res: any) => {
        if (res.code == undefined) {
          activities.value = activities.value.map(activity => activity.activityId === form.value.activityId ? form.value : activity);
          ElMessage.success('保存成功');
        }
        else console.log(res)
      })
    }
    catch (error) {
      ElMessage.error('编辑失败');
    }




  } catch (error) {
    ElMessage.error('保存失败');
  }
};
</script>

<style scoped>
/* 根据需要添加样式 */
</style>
