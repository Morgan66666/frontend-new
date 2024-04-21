<template>
  <div class="control-panel-container">
      <div class="common-layout" style="height: 100%">
        <el-container style="height: 100%">
          <el-header>
            Header
          </el-header>
          <el-container>
            <el-aside width="250px">
              <Menu />
            </el-aside>
            <el-container>
              <el-main>Main</el-main>
              <el-footer>Footer</el-footer>
            </el-container>
          </el-container>
        </el-container>
      </div>
  </div>
</template>

<script lang="ts" setup>

import Menu from "../components/ControlPanelComponents/Menu.vue";
</script>

<style scoped>
.control-panel-container {
  height: 100%;
}

</style>

