<template>
  <div class="activity">
    <div class="book-ticket">
      <div class="main-contain">
        <div class="img-detail-300-400">
          <img
              src="https://i.natgeofe.com/n/4f2165db-8495-486d-993f-e2a2e6970087/GettyImages-10182373_4x3.jpg?w=2880&h=2160"
              alt=""/>
        </div>
        <div class="detail-info">
          <span class="title">{{ activity.title }}</span>
          <div class="time">
            <div class="time-title">时间：</div>
            <div class="time-content">{{ activity.activityBeginTime }} - {{ activity.activityEndTime }}</div>
          </div>
          <div class="location">
            <div class="location-title">地点：</div>
            <div class="location-content">{{ activity.location }}</div>
          </div>
          <div class="description">
            <div class="description-title">简介：</div>
            <div class="description-content">{{ activity.description }}</div>
          </div>
          <div class="capacity">
            <div class="capacity-title">容量：</div>
            <div class="capacity-content">{{ activity.capacity }}</div>
          </div>
          <div class="remaining">
            <div class="remaining-title">剩余：</div>
            <div class="remaining-content">{{ remaining }}</div>
          </div>
          <div class="price">
            <div class="price-title">价格：</div>
            <div class="price-content">
              <i>￥</i>
              {{ activity.price }}
            </div>
          </div>
          <div class="operation">
            <div class="book-button">
              <div class="book-button-content" @click="book">
                <div>立即预定</div>
              </div>
            </div>
            <div class="star-button">
              <div class="star" @click="star">
                <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" class="video-fav-icon video-toolbar-item-icon" data-v-b42ec39c="">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8071 9.26152C18.7438 9.09915 17.7624 8.36846 17.3534 7.39421L15.4723 3.4972C14.8998 2.1982 13.1004 2.1982 12.4461 3.4972L10.6468 7.39421C10.1561 8.36846 9.25639 9.09915 8.19315 9.26152L3.94016 9.91102C2.63155 10.0734 2.05904 11.6972 3.04049 12.6714L6.23023 15.9189C6.96632 16.6496 7.29348 17.705 7.1299 18.7605L6.39381 23.307C6.14844 24.6872 7.62063 25.6614 8.84745 25.0119L12.4461 23.0634C13.4276 22.4951 14.6544 22.4951 15.6359 23.0634L19.2345 25.0119C20.4614 25.6614 21.8518 24.6872 21.6882 23.307L20.8703 18.7605C20.7051 17.705 21.0339 16.6496 21.77 15.9189L24.9597 12.6714C25.9412 11.6972 25.3687 10.0734 24.06 9.91102L19.8071 9.26152Z" fill="currentColor">
                  </path>
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="activity-detail">
      <div class="activity-detail-title">
        <span>活动详情</span>
      </div>
      <div class="activity-detail-container">
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {ActivityDetail} from "../types";
import {computed, onMounted, ref} from "vue";
import axiosInstance from '@/main.ts';
let activity = ref<ActivityDetail>({
  activityBeginTime: "2024-05-01",
  activityEndTime: "2024-05-01",
  activityId: 0,
  bookBeginTime: "",
  bookEndTime: "",
  createTime: "",
  organizerId: 0,
  participantsCount: 0,
  type: "",
  title: '活动一',
  description: '这是活动一的描述,哈哈哈哈哈哈哈哈红红火火恍恍惚惚哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈' +
      '哈哈哈哈哈哈哈哈红红火火恍恍惚惚哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈' +
      '哈哈哈哈哈哈哈哈红红火火恍恍惚惚哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
  location: '地点一',
  img: 'https://www.natgeo.com.cn/pic/program_default.768.jpg',
  price: 100,
  content: '这是活动一的内容,哈哈哈哈哈哈哈哈红红火火恍恍惚惚哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
  capacity: 100,
});

interface Props {
  activityId: number;
}

const props = defineProps<Props>();

const remaining = computed(() => {
  return activity.value.capacity - activity.value.participantsCount;
});

function book() {
  console.log('book');
}

function star() {
  console.log('star');
}

const getData = async (activityId: number) => {
  try {
    const res = await axiosInstance.get(`/activity/${activityId}`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  getData(props.activityId).then((data => {
    activity.value = data;
  }));
});
</script>


<style scoped>
.activity {
  background-color: #f4f5f7;
}

.activity-detail {
  width: 100%;
}

.activity-detail-title {
  width: 1000px;
  margin: 40px auto 0;
  height: 50px;
  background-color: #ffffff;
  border-radius: 10px;
  border-color: rgba(128, 127, 127, 0.5);
  border-style: solid;
  border-width: 1px 1px 1px 1px;
}

.activity-detail-title span {
  font-family: "微软雅黑", "Microsoft Himalaya", Arial, sans-serif;
  font-size: 20px;
  line-height: 50px;
  margin-left: 30px;
  color: rgb(100, 100, 100);
  user-select: none;
}

.activity-detail-container {
  width: 1000px;
  background-color: #ffffff;
  border-radius: 10px;
  border-color: rgba(128, 127, 127, 0.5);
  border-style: solid;
  border-width: 1px 1px 1px 1px;
  height: 1000px;
  display: flex;
  margin: 10px auto 40px;
}

.book-ticket {
  background-color: #FFF;
  width: 100%;
  padding-bottom: 50px;
}

.main-contain {
  width: 1000px;
  margin: 40px auto 0;
  display: flex;
  background-color: rgb(253, 253, 253);
  height: 550px;
  border-style: solid;
  border-width: 1px 1px 1px 1px;
  border-color: rgba(128, 127, 127, 0.5);
  border-radius: 10px;
  padding-top: 30px;
}

.img-detail-300-400 img {
  width: 300px;
  height: 400px;
  margin: 0 20px 0 30px;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/*.img-detail-300-400{
  width: 400px;
  height: 500px;
}*/

.detail-info {
  margin-top: 0;
  flex-grow: 1;

}

.title {
  flex-grow: 1;
  display: inline-block;
  font-size: 22px;
  height: 24px;
}

.detail-info span {
  font-family: "微软雅黑", "Microsoft Himalaya", Arial, sans-serif;
}

.time {
  margin-top: 30px;
  display: flex;
  align-content: center;
  width: 100%;
}

.location {
  display: flex;
  align-content: center;
  margin-top: 15px;
  padding-bottom: 10px;
  border-bottom: 1px dashed rgb(128, 127, 127);
  width: calc(100% - 30px);
}

.time-title, .location-title {
  font-family: "微软雅黑", "Microsoft Himalaya", Arial, sans-serif;
  color: rgb(128, 128, 128);
  font-size: 14px;
  line-height: 18px;
  margin-right: 30px;
  user-select: none;
}

.description {
  margin-top: 15px;
  display: flex;
  align-content: center;
  padding-bottom: 15px;
  border-bottom: 1px dashed rgb(128, 127, 127);
  width: calc(100% - 30px)
}
.description-title {
  font-family: "微软雅黑", "Microsoft Himalaya", Arial, sans-serif;
  color: rgb(128, 128, 128);
  font-size: 14px;
  line-height: 18px;
  margin-right: 30px;
  user-select: none;
}

.description-content {
  font-family: "微软雅黑", "Microsoft Himalaya", Arial, sans-serif;
  color: black;
  font-size: 14px;
  line-height: 18px;
  width: 530px;
  background-color: rgba(128, 128, 128, 0.1);
  border-radius: 5px;
  padding: 5px;
}

.time-content, .location-content {
  font-family: "微软雅黑", "Microsoft Himalaya", Arial, sans-serif;
  color: black;
  font-size: 14px;
  line-height: 18px;
}

.capacity, .remaining {
  display: flex;
  align-content: center;
  margin-top: 24px;
  user-select: none;
}

.capacity-title, .remaining-title{
  font-family: "微软雅黑", "Microsoft Himalaya", Arial, sans-serif;
  color: rgb(128, 128, 128);
  font-size: 16px;
  line-height: 18px;
  margin-right: 40px;
  font-weight: bold;
}

.capacity-content, .remaining-content{
  font-family: "微软雅黑", "Microsoft Himalaya", Arial, sans-serif;
  color: rgb(34,188,181);
  font-size: 20px;
  line-height: 18px;
  font-weight: bold;
}

.price {
  display: flex;
  align-content: center;
  margin-top: 30px;
  user-select: none;
}

.price-title {
  font-family: "微软雅黑", "Microsoft Himalaya", Arial, sans-serif;
  color: rgb(128, 128, 128);
  font-size: 16px;
  line-height: 30px;
  margin-right: 40px;
  font-weight: bold;
}

.price-content {
  font-family: "微软雅黑", "Microsoft Himalaya", Arial, sans-serif;
  color: rgb(235, 107, 0);
  font-size: 21px;
  line-height: 30px;
  font-weight: bold;
}

.price-content i {
  position: relative;
  left: 3px;
  font-size: 16px;
  font-style: normal;
}

.operation {
  margin-top: 40px;
  display: flex;
}

.book-button {
  margin-left: 95px;
  width: 300px;
}

.book-button-content {
  width: 240px;
  height: 50px;
  background-image: linear-gradient(-48deg, #ff6a9c, #fe8574);
  text-align: center;
  align-content: center;
  color: #ffffff;
  border-radius: 5px;
  display: inline-block;
  cursor: pointer;
  user-select: none;
}

.star-button {
  margin-left: 20px;
  width: 50px;
  display: flex;
}

.star {
  width: auto;
  height: auto;
  justify-content: center;
  align-content: center;
  color: rgb(97,102,109);
  cursor: pointer;
}

</style>