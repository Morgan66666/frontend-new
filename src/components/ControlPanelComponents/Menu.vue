<template>
  <el-row class="tac" style="height: 100%">
    <el-col :span="24" style="height: 100%">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        style="height: 100%"
        @select="handleSelect"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Location />
            </el-icon>
            <span>活动管理</span>
          </template>
          <el-menu-item index="ActivityManager">
            <el-icon>
              <Location />
            </el-icon>
            <span>活动列表</span>
          </el-menu-item>
          <el-menu-item index="ActivityApproval">
            <el-icon>
              <Location />
            </el-icon>
            <span>活动审批</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="UserManager">
          <el-icon>
            <IconMenu />
          </el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="OrderManager">
          <el-icon>
            <Setting />
          </el-icon>
          <span>订单管理</span>
        </el-menu-item>
        <el-menu-item index="ApiManager">
          <el-icon>
            <Setting />
          </el-icon>
          <span>API管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';
import {
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';

const emit = defineEmits(['menu-select']);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleSelect = (index: string) => {
  emit('menu-select', index);
};
</script>
