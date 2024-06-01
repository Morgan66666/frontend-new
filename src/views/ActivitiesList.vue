<template>
  <SearchBar :onSearch="Search"/>
  <div class="background-container">
    <div class="list">
      <v-container >
        <v-row>
          <v-col
              v-for="activity in activities"
              :key="activity.activityId"
              cols="12" sm="6" md="6" lg="6"
              class="my"
          >
            <activity-card :activity="activity" @click="navigateToActivityDetail(activity)"/>
          </v-col>
        </v-row>
        <el-affix :offset="200" position="bottom">
          <div class="create-activity-button" @click="createActivity">+</div>
        </el-affix>
      </v-container>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ActivityDetail} from "@/types";
import {onMounted, ref, inject, PropType, watch} from "vue";
import ActivityCard from "../components/ActivityCard.vue";
import SearchBar from "../components/SearchBar.vue";

const api:any = inject("$api");

const router:any = inject("$router");

function navigateToActivityDetail(activity: Partial<ActivityDetail>) {
  console.log('跳转到活动详情页', activity);
  router.push({path: '/activity' , query: {activityId: activity.activityId}});
}

function createActivity() {
  console.log('创建活动');
  // 跳转到创建活动页面或显示创建活动的对话框
  router.push({path: '/create-activity'});
}

function Search(searchQuery: string) {
  console.log('搜索', searchQuery);
  // 假设 api.activity.searchActivities 是你的搜索 API
  api.getActivities({ query: searchQuery }).then((res: any) => {
    activities.value = res.data;
  });
}

onMounted(async () => {
  api.activity.getActivities().then((res:any) => {
    const records = res.records;
    console.log(records)
    activities.value = records
  })
})

const props = defineProps({
  searchActivities: {
    type: Array as PropType<ActivityDetail[]>,
    required: true
  }
})

watch(() => props.searchActivities, (newVal) => {
  activities.value = newVal
})

const activities = ref<Partial<ActivityDetail>[]>([
  {
    activityId: 1,
    title: '活动一',
    description: '这是活动一的描述',
    location: '地点一',
    activityBeginTime: '2024-05-01',
    activityEndTime: '2024-05-01',
    img: 'https://www.natgeo.com.cn/pic/program_default.768.jpg',
    price: 100,
    capacity: 100,
    participantsCount: 50
  },
  {
    activityId: 2,
    title: '活动二',
    description: '这是活动二的描述',
    location: '地点二',
    activityBeginTime: '2024-05-02',
    activityEndTime: '2024-05-02',
    img: 'https://i.natgeofe.com/n/5d7fc2d3-30a5-475d-ba96-b35f4dc6d213/NationalGeographic_1517431_2x3.jpg?w=2880&h=4320',
    price: 200,
    capacity: 200,
    participantsCount: 150
  },
  {
    activityId: 23,
    title: '活动三',
    description: '这是活动三的描述',
    location: '地点三',
    activityBeginTime: '2024-05-03',
    activityEndTime: '2024-05-03',
    img: 'https://i.natgeofe.com/n/519530cd-2b07-4722-86f4-1ef1887b0565/PIA10189_square.jpg?w=2880&h=2880',
    price: 300,
    capacity: 300,
    participantsCount: 250
  },
  // ...更多活动
]);

</script>

<style scoped>


.my {
  margin-top: 50px;
}

.background-container {
  width: 100%;
  height: 100vh;
  background-color: #f4f5f7;
}

.list {
  width: 75vw;
  margin: 0 auto;
}

.create-activity-button {
  position: fixed;
  bottom: 22vh;
  right: 20vh;
  width: 50px;
  height: 50px;
  background-color: #409eff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  z-index: 1000;
}
</style>
