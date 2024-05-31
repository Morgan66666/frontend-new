<template>
  <div class="search-bar-container">
    <div class="search-bar">
      <div style="width: 10px">

      </div>
      <input type="text" class="search-input" placeholder="搜索活动" v-model="searchQuery" @keyup.enter="props.onSearch"/>
      <button class="search-btn" @click="onSearchHandler">
        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
      </button>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {ref} from 'vue';

// 定义搜索查询字符串为响应式数据
const searchQuery = ref<string>('');

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const props = defineProps<SearchBarProps>();

const onSearchHandler = () => {
  props.onSearch(searchQuery.value);
};
</script>

<style>

@import url('https://fonts.googleapis.com/icon?family=Material+Icons');


.search-bar-container {
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  margin-bottom: 3px;
}


.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 50px;
  background-color: #f1f3f4;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 560px;
  margin: 10px auto;
}


.search-input {
  border: none;
  outline: none;
  margin-right: 10px;
  background-color: transparent;
  font-size: 16px;
  width: 100%;
}


.search-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  height: 24px;
}

.search-btn:focus {
  outline: none;
}



.search-btn svg path{
  fill: grey;
}

.search-btn svg {
  width: 24px;
  height: 24px;
}


.search-bar, .search-input, .search-btn {
  transition: all 0.3s ease-in-out;
}

.search-bar:focus-within {
  background-color: white;
  box-shadow: 0 3px 6px rgba(0,0,0,0.3);
}


@media (max-width: 600px) {
  .search-bar {
    width: 90%;
  }
}

</style>
