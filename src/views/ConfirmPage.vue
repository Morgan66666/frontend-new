<template>
  <div class="confirm-order">
    <h2>订单信息</h2>
    <v-divider></v-divider>
    <v-card class="order-card">
      <v-card-title>活动</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="3" class="image-container">
            <v-img :src="activity.img" class="fill-image"></v-img>
          </v-col>
          <v-col cols="9">
            <div class="order-item">
              <span class="order-title">活动标题:</span>
              <span class="order-content">{{ activity.title }}</span>
            </div>
            <div class="order-item">
              <span class="order-title">时间:</span>
              <span class="order-content">{{ activity.activityBeginTime }} - {{ activity.activityEndTime }}</span>
            </div>
            <div class="order-item">
              <span class="order-title">地点:</span>
              <span class="order-content">{{ activity.location }}</span>
            </div>
            <div class="order-item">
              <span class="order-title">单价:</span>
              <span class="order-content">￥{{ activity.price }}</span>
            </div>
            <div class="order-item">
              <span class="order-title">数量:</span>
              <el-input-number v-model="numTickets" :min="1" :max="4" class="num-tickets"></el-input-number>
            </div>
            <div class="order-item">
              <span class="order-title">总价:</span>
              <span class="order-content total-price">￥{{ activity.price * numTickets }}</span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="contact-card">
      <v-card-title>联系人信息</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="contact.name" :rules="nameRules" label="姓名" required></v-text-field>
          <v-text-field v-model="contact.phone" :rules="phoneRules" label="手机号" required></v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
    <v-divider></v-divider>
    <v-row justify="end" class="button-row">
      <v-col cols="auto">
        <v-btn outlined color="secondary" @click="goBack">回退</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn :disabled="!valid" color="primary" @click="confirmOrder">
          确认, ￥{{ activity.price * numTickets }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, inject} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';
import {ActivityDetail, Order, UserInfo} from '@/types';
import * as timeUtil from "@/utils/timeUtil.ts";

const route = useRoute();
const router = useRouter();
const activityId = route.query.activityId;
const store:any = inject('$store');

let activity = ref<ActivityDetail>({
  status: "",
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
  description: '这是活动一的描述',
  location: '地点一',
  img: 'https://www.natgeo.com.cn/pic/program_default.768.jpg',
  price: 100,
  content: '这是活动一的内容',
  capacity: 100
});

const numTickets = ref(1);
const contact = ref({
  name: '',
  phone: ''
});

const nameRules = [
  (v: string) => !!v || '姓名为必填项',
  (v: string) => (v && v.length <= 20) || '姓名不得超过20个字符',
];

const phoneRules = [
  (v: string) => !!v || '手机号为必填项',
  (v: string) => /^1[3-9]\d{9}$/.test(v) || '手机号格式不正确',
];

const valid = ref(false);

const api: any = inject('$api');

const getActivity = async (activityId: number) => {
  try {
    const data: ActivityDetail = await api.activity.getActivityByActivityId({activityId: activityId});
    // 假设时间戳字段是 activityBeginTime 和 activityEndTime
    data.activityBeginTime = timeUtil.convertTimestampToLocal(Number(data.activityBeginTime));
    data.activityEndTime = timeUtil.convertTimestampToLocal(Number(data.activityEndTime));
    data.bookBeginTime = timeUtil.convertTimestampToLocal(Number(data.bookBeginTime));
    data.bookEndTime = timeUtil.convertTimestampToLocal(Number(data.bookEndTime));
    activity.value = data;
    console.log(activity.value);
  } catch (e) {
    console.error(e);
  }
};

const order = ref<Order>({
  totlePrice: "",
  activityId: 0,
  name: "",
  phoneNumber: "",
  userId: "",
  numberOfPeople: 0

});


let userInfo:UserInfo = store.getters.getUserInfo;


const confirmOrder = () => {
  if (!valid.value) {
    ElMessage({
      message: '请填写完整的联系人信息',
      type: 'warning',
    });
    return;
  }
  const userId = userInfo.userId;
  try {
    order.value = {
      totlePrice: "",
      activityId: activity.value.activityId,
      name: contact.value.name,
      phoneNumber: contact.value.phone,
      userId: userId,
      numberOfPeople: numTickets.value
    };
    api.order.createOrder(order.value).then((res: any) => {
      console.log('订单创建成功', res);
      ElMessage({
        message: '订单创建成功',
        type: 'success',
      });
    });
  } catch (e) {
    console.error(e);
    ElMessage({
      message: '订单创建失败',
      type: 'error',
    });
  }

  router.push({path: '/activity', query: {activityId: activity.value.activityId}});
};

const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  getActivity(Number(activityId));
});
</script>

<style scoped>
.confirm-order {
  padding: 20px;
  max-width: 800px;
  margin: 30px auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.order-card, .contact-card {
  margin-bottom: 20px;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 260px;
  width: 100%;
}

.fill-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center; /* 确保内容垂直居中 */
  padding: 10px 0;
}

.order-title {
  font-weight: bold;
}

.order-content {
  font-size: 16px;
}

.text-right {
  text-align: right;
}

.total-price {
  color: #42b983;
  font-weight: bold;
}

.button-row {
  margin-top: 20px;
}

.v-btn {
  margin-right: 10px;
}

.num-tickets {
  width: 140px; /* 调整宽度 */
  display: flex;
  align-items: center; /* 确保内容垂直居中 */
}

.el-input-number__decrease, .el-input-number__increase {
  background-color: #f56c6c;
  color: white;
}

.el-input-number__input {
  text-align: center;
}
</style>
