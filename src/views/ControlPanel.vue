<template>
  <div class="control-panel-container">
    <div class="common-layout" style="height: 100%">
      <el-container style="height: 100%">
<!--        <el-header>-->
<!--          Header-->
<!--        </el-header>-->
        <el-container>
          <el-aside width="250px">
            <Menu @menu-select="handleMenuSelect" />
          </el-aside>
          <el-container>
            <el-main>
              <component :is="currentComponent"></component>
            </el-main>
<!--            <el-footer>Footer</el-footer>-->
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineComponent } from 'vue';
import Menu from '@/components/ControlPanelComponents/Menu.vue';
import ActivityManager from '@/components/ControlPanelComponents/ActivityManager.vue';
import UserManager from '@/components/ControlPanelComponents/UserManager.vue';
import OrderManager from '@/components/ControlPanelComponents/OrderManager.vue';
import ApiManager from '@/components/ControlPanelComponents/ApiManager.vue';
import PostManager from '@/components/ControlPanelComponents/PostManager.vue';

const components = {
  ActivityManager,
  UserManager,
  OrderManager,
  ApiManager,
  PostManager
};

const currentComponent = ref<ReturnType<typeof defineComponent>>(ActivityManager);

const handleMenuSelect = (componentName: keyof typeof components) => {
  currentComponent.value = components[componentName];
};
</script>

<style scoped>
.control-panel-container {
  height: 100%;
}
</style>
