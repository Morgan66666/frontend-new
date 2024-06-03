<template>
  <div ref="orderManager">
    <el-table :data="orders1" :style="{ width: `${tableWidth}px` }">
      <el-table-column prop="activityTitle" label="活动标题" :width="columnWidths.activityTitle">
        <template #default="scope">
          <router-link :to="{ path: '/activity', query: { activityId: scope.row.activityId }}" class="no-underline">
            {{ scope.row.activityTitle }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" :width="columnWidths.actions">
        <template #default="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.row.collectionId)">取消收藏</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, onUnmounted, inject, watch} from 'vue';
import { ElMessage } from 'element-plus';
import router from '@/router';
import {AcStar} from "@/types";

const orders = ref<AcStar[]>([]);
const api: any = inject('$api');
const userId = router.currentRoute.value.params.userId;
const orderManager = ref<HTMLElement | null>(null);
const tableWidth = ref(0);
const columnWidths = ref({
  activityTitle: 0,
  actions: 0,
});

const calculateColumnWidths = () => {
  if (orderManager.value) {
    tableWidth.value = orderManager.value.clientWidth;
    const totalWidth = tableWidth.value;

    columnWidths.value = {
      activityTitle: Math.floor(totalWidth * 0.85),
      actions: Math.floor(totalWidth * 0.15),
    };
  }
};

const fetchStar = async () => {
  try {
    const res = await api.activity.getCollectionsByUserId({ collector_Id: userId });
    if (res.code === undefined) {
      orders.value = res.records;
    } else {
      console.log(res);
    }
  } catch (error) {
    ElMessage.error('获取收藏列表失败');
  }
};

const handleDelete = async (orderId: number) => {
  try {
    const res = await api.activity.unstarActivity({ collectionId: orderId });
    if (res.code === undefined) {
      await fetchStar();
      ElMessage.success('删除成功');
    } else {
      throw new Error('删除订单失败');
    }
  } catch (error) {
    ElMessage.error('删除失败');
  }
};

interface record{
  activityTitle: string;
  activityId?: number;
  collectionId?: number;
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
      activityTitle: title,
      activityId: order.activityId,
      collectionId: order.collectionId
    };
  }));

  orders1.value = orders1Array;
});


onMounted(() => {
  fetchStar();
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
