<template>
  <div>
    <el-table :data="orders" style="width: 100%">
      <el-table-column prop="orderId" label="订单ID" width="150"></el-table-column>
      <el-table-column prop="activityId" label="活动ID" width="150"></el-table-column>
      <el-table-column prop="userId" label="用户ID" width="150"></el-table-column>
      <el-table-column prop="amount" label="订单金额" width="150"></el-table-column>
      <el-table-column prop="tradeNumber" label="交易人数" width="100"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
      <el-table-column prop="status" label="订单状态" width="100">
        <template #default="scope">
          <el-tag :type="getStatusTagType(scope.row.status)">
            {{ getStatusText(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.orderId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑订单信息的对话框 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible">
      <el-form :model="form">
        <el-form-item label="订单ID">
          <el-input v-model="form.orderId" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动ID">
          <el-input v-model="form.activityId"></el-input>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input v-model="form.userId"></el-input>
        </el-form-item>
        <el-form-item label="订单金额">
          <el-input v-model="form.totlePrice"></el-input>
        </el-form-item>
        <el-form-item label="交易人数">
          <el-input v-model="form.numberOfPeople"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker v-model="form.createTime" type="datetime" placeholder="选择创建时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form.status" placeholder="请选择订单状态">
            <el-option label="待处理" :value="0"></el-option>
            <el-option label="已完成" :value="1"></el-option>
            <el-option label="已取消" :value="2"></el-option>
          </el-select>
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
import {Order} from "@/types";


const orders = ref<Order[]>([]);
const dialogVisible = ref(false);
const dialogTitle = ref('');
const form = ref<Partial<Order>>({});

// 获取订单列表（假设从API获取）
const fetchOrders = async () => {
  try {
    // 假设API返回订单列表
    orders.value = [
      {
        orderId: 1,
        activityId: 101,
        userId: "1001",
        totlePrice: "99.99",
        numberOfPeople: 1,
        createTime: '2024-05-28T12:00:00',
        status: 0,
        transactionId: "1",
        name: "张三",
        phoneNumber: "13812345678",
      },
      {
        orderId: 2,
        activityId: 111,
        userId: "1002",
        totlePrice: "991.99",
        numberOfPeople: 1,
        createTime: '2024-05-28T12:00:00',
        status: 0,
        transactionId: "1",
        name: "李四",
        phoneNumber: "13812345678",
      },
    ];
  } catch (error) {
    ElMessage.error('获取订单列表失败');
  }
};

// 初始化时获取订单列表
fetchOrders();

const getStatusText = (status: number) => {
  switch (status) {
    case 1:
      return '已完成';
    case 2:
      return '已取消';
    case 0:
    default:
      return '待处理';
  }
};

const getStatusTagType = (status: number) => {
  switch (status) {
    case 1:
      return 'success';
    case 2:
      return 'danger';
    case 0:
    default:
      return 'warning';
  }
};

const handleEdit = (order: Order) => {
  form.value = { ...order };
  dialogTitle.value = '编辑订单信息';
  dialogVisible.value = true;
};

const handleDelete = async (orderId: number) => {
  try {
    // 假设调用API删除订单
    orders.value = orders.value.filter(order => order.orderId !== orderId);
    ElMessage.success('删除成功');
  } catch (error) {
    ElMessage.error('删除失败');
  }
};

const handleSave = async () => {
  try {
    // 编辑订单信息，假设调用API更新订单
    const index = orders.value.findIndex(order => order.orderId === form.value.orderId);
    if (index !== -1) {
      orders.value[index] = { ...form.value } as Order;
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
