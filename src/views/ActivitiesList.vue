<template>
  <SearchBar :onSearch="Search"/>
  <div class="background-container">
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
    </v-container>
  </div>
</template>

<script setup lang="ts">

import {Activity} from "@/types";
import {ref} from "vue";
import ActivityCard from "../components/ActivityCard.vue";
import SearchBar from "../components/SearchBar.vue";
import router from "../router";

function navigateToActivityDetail(activity: Activity) {
  console.log('跳转到活动详情页', activity);
  router.push(`/activity`);

}

const activities = ref<Activity[]>([
  {
    activityId: 1,
    title: '活动一',
    description: '这是活动一的描述',
    location: '地点一',
    activityBeginTime: '2024-05-01',
    activityEndTime: '2024-05-01',
    img: 'https://www.natgeo.com.cn/pic/program_default.768.jpg',
    price: 100
  },
  {
    activityId: 2,
    title: '活动二',
    description: '这是活动二的描述',
    location: '地点二',
    activityBeginTime: '2024-05-02',
    activityEndTime: '2024-05-02',
    img: 'https://i.natgeofe.com/n/5d7fc2d3-30a5-475d-ba96-b35f4dc6d213/NationalGeographic_1517431_2x3.jpg?w=2880&h=4320',
    price: 200
  },
  {
    activityId: 23,
    title: '活动三',
    description: '这是活动三的描述',
    location: '地点三',
    activityBeginTime: '2024-05-03',
    activityEndTime: '2024-05-03',
    img: 'https://i.natgeofe.com/n/519530cd-2b07-4722-86f4-1ef1887b0565/PIA10189_square.jpg?w=2880&h=2880',
    price: 300
  },
  // ...更多活动
]);

function Search() {
  console.log('搜索');
}

</script>

<style scoped>

.my {
  margin-top: 50px;
}

.background-container{
  width: 100%;
  height: 100%;
  background-color: #f4f5f7;
}





</style>
