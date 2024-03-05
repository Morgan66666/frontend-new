<script setup lang="ts">

import HeaderOfMainPage from "./components/header.vue";

</script>

<template>
  <div class="container">
    <HeaderOfMainPage></HeaderOfMainPage>
    <router-view></router-view>
  </div>
</template>

<style scoped>
/*html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}*/

body {
  padding: 0;
  margin: 0 0 70px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  height: 100%;
  width: 100%;
}
</style>
