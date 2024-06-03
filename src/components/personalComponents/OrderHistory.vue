<template>
  <div ref="orderManager">
    <el-table :data="orders1" :style="{ width: `${tableWidth}px` }">
      <el-table-column prop="transactionId" label="交易号" :width="columnWidths.orderId"></el-table-column>
      <el-table-column prop="activityTitle" label="活动标题" :width="columnWidths.activityId">
        <template #default="scope">
          <router-link :to="{ path: '/activity', query: { activityId: scope.row.activityId }}" class="no-underline">
            {{ scope.row.activityTitle }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="totalPrice" label="订单金额" :width="columnWidths.userId"></el-table-column>
      <el-table-column prop="numberOfPeople" label="参加人数" :width="columnWidths.tradeNumber"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" :width="columnWidths.createTime"></el-table-column>
      <el-table-column label="操作" :width="columnWidths.actions">
        <template #default="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.row.orderId)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, onUnmounted, inject, watch} from 'vue';
import { ElMessage } from 'element-plus';
import { Order } from '@/types';
import router from '@/router';
import {convertTimestampToLocal} from "@/utils/timeUtil.ts";

const orders = ref<Order[]>([]);
const api: any = inject('$api');
const userId = router.currentRoute.value.params.userId;
const orderManager = ref<HTMLElement | null>(null);
const tableWidth = ref(0);
const columnWidths = ref({
  orderId: 0,
  activityId: 0,
  userId: 0,
  tradeNumber: 0,
  createTime: 0,
  actions: 0,
});

const calculateColumnWidths = () => {
  if (orderManager.value) {
    tableWidth.value = orderManager.value.clientWidth;
    const totalWidth = tableWidth.value;

    columnWidths.value = {
      orderId: Math.floor(totalWidth * 0.20), // 15%
      activityId: Math.floor(totalWidth * 0.20), // 15%
      userId: Math.floor(totalWidth * 0.15), // 15%
      tradeNumber: Math.floor(totalWidth * 0.15), // 10%
      createTime: Math.floor(totalWidth * 0.15), // 15%
      actions: Math.floor(totalWidth * 0.15), // 10%
    };
  }
};

const fetchOrders = async () => {
  try {
    const res = await api.order.getOrdersByUserId({ userId: userId });
    if (res.code === undefined) {
      orders.value = res.records;
    } else {
      console.log(res);
    }
  } catch (error) {
    ElMessage.error('获取订单列表失败');
  }
};

const handleDelete = async (orderId: number) => {
  try {
    const res = await api.order.deleteOrder({ orderId: orderId });
    if (res.code === undefined) {
      orders.value = orders.value.filter(order => order.orderId !== orderId);
      ElMessage.success('删除成功');
    } else {
      throw new Error('删除订单失败');
    }
  } catch (error) {
    ElMessage.error('删除失败');
  }
};

interface record{
  transactionId?: string;
  activityTitle: string;
  totalPrice: string;
  numberOfPeople?: number;
  createTime?: string;
  activityId?: number;
}

const orders1 = ref<record[]>([]);
watch(orders, async () => {
  const ordersArray = orders.value;
  const orders1Array = await Promise.all(ordersArray.map(async (order) => {
    let title = '';
    try {
      const res = await api.activity.getActivityByActivityId({ activityId: order.activityId });
      if (res.code === undefined) {
        title = res.title;
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }

    return {
      transactionId: order.orderNumber,
      totalPrice: order.totalPrice,
      numberOfPeople: order.numberOfPeople,
      createTime: convertTimestampToLocal(order.createTime!),
      activityTitle: title,
      activityId: order.activityId
    };
  }));

  orders1.value = orders1Array;
});


onMounted(() => {
  fetchOrders();
  calculateColumnWidths();
  window.addEventListener('resize', calculateColumnWidths);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculateColumnWidths);
});
</script>

<style scoped>
.no-underline {
  text-decoration: none;
  color: inherit;
}
.no-underline:hover {
  text-decoration: underline;
}
</style>
