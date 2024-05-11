<template>
  <div class="main_container">
    <div class="list">
      <div
        class="list-item"
        v-for="item in items"
        :key="item.id"
        @click="selectedItem = item"
        :class="{ active: item === selectedItem }"
      >
        <img class="list-item-avatar" :src="item.avatar"  alt=""/>
        <a class="list-item-username">{{ item.username }}</a>
      </div>
    </div>
    <div class="content">
      <div class="message-list">
        <div
          v-for="item in selectedItem.messageList"
          :key="item.id"
          class="message-list-item"
          :class="{ right: item.userId === userId }"
        >
          <img
            v-if="item.userId !== userId"
            class="message-list-item-avatar"
            :src="selectedItem.avatar"
           alt=""/>
          <div class="message-list-item-content">{{ item.content }}</div>
          <img
            v-if="item.userId === userId"
            class="message-list-item-avatar"
            :src="selectedItem.avatar"
           alt=""/>
        </div>
      </div>
      <div id="message-input">
        <textarea
          ref="textarea"
          v-model="message"
          placeholder="Type a message..."
          @input="autoGrow"
          :style="{ maxHeight: '120px' }"
        />
        <div class="message-input-send" style="width: 100%">
          <button  @click="sendMessage">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface message {
  id: string;
  userId: string;
  username: string;
  content: string;
}
// const userId = store.getters.getUserInfo.userId;
const userId = "1";

const items = ref([
  {
    id: "Item 1",
    username: "This is item 1",
    avatar: "https://api-static.mihoyo.com/mainPage/bh2-logo-v2.png",
    messageList: [
      {
        id: "Item 1",
        userId: "1",
        username: "Item 1",
        content: "This is item 1",
      },
      {
        id: "Item 1",
        userId: "2",
        username: "Item 1",
        content:
          "This is item 1,This is item 1,This is item 1,This is item 1,This is item 1",
      },
      {
        id: "Item 1",
        userId: "1",
        username: "Item 1",
        content: "This is item 1",
      },
    ] as message[],
  },
  {
    id: "Item 2",
    username: "This is item 2",
    avatar: "https://api-static.mihoyo.com/mainPage/bh2-logo-v2.png",
    messageList: [
      {
        id: "Item 1",
        userId: "12",
        username: "Item 1",
        content: "This is item 1",
      },
    ] as message[],
  },
  {
    id: "Item 3",
    username: "This is item 3",
    avatar: "https://api-static.mihoyo.com/mainPage/bh2-logo-v2.png   ",
    messageList: [
      {
        id: "Item 1",
        userId: "12",
        username: "Item 1",
        content: "This is item 1",
      },
    ] as message[],
  },
]);

const selectedItem = ref({
  id: "",
  username: "",
  avatar: "",
  messageList: [] as message[],
});
const message = ref("");
const textarea = ref(null);

const autoGrow = () => {
  textarea.value.style.height = "auto";
  textarea.value.style.height = textarea.value.scrollHeight + "px";
};

const sendMessage = () => {
  if (message.value === "") {
    return;
  }
  selectedItem.value.messageList.push({
    id: selectedItem.value.id,
    userId: userId,
    username: "Me",
    content: message.value,
  });
  message.value = "";
  autoGrow();
};
</script>


<style scoped>
.main_container {
  width: 900px;
  height: 600px;
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(238, 238, 238);
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.list {
  width: 25%;
  background-color: transparent;
  border-right: 1px solid rgb(164, 164, 164);
}

.list-item {
  height: 50px;
  line-height: 50px;
  display: flex;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid rgb(0, 0, 0);
  background-color: transparent;
}

.list-item-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(0, 0, 0);
  margin-left: 20px;
  margin-top: auto;
  margin-bottom: auto;
}

.list-item-username {
  margin-left: 20px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  margin-top: auto;
  margin-bottom: auto;
}

.list-item:hover {
  background-color: rgb(183, 183, 183);
}

.list-item.active {
  background-color: rgb(183, 183, 183);
}

.content {
  width: 75%;
  overflow-y: auto;
  background-color: transparent;
  border-right: 1px solid rgb(0, 0, 0);
}

.message-list {
  height: 73%;
  background-color: transparent;
  overflow-y: auto;
  
}

.message-list-item {
  display: flex;
  height: auto;
  line-height: 50px;
  margin-bottom: 10px;
  background-color: transparent;
}

.message-list-item.right {
  display: flex;
  height: auto;
  line-height: 50px;
  margin-bottom: 10px;
  padding-right: 10px;
  background-color: transparent;
  justify-content: flex-end;
}

.message-list-item-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(0, 0, 0);
  margin-left: 20px;
  margin-top: 5px;
}

.message-list-item-content {
  margin-left: 20px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  line-height: 28px;
  margin-top: 10px;
  max-width: 500px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: auto;
  background-color: rgb(124, 192, 234);
  border-radius: 10px;
}

#message-input {
  border-top: 1px solid rgb(163, 163, 163);
  height: 27%;
  background-color: transparent;
}

#message-input textarea {
  width: 100%;
  padding: 10px;
  min-height: 120px;
  border: none;
  overflow: auto;
  resize: none;
  outline: none;
}

.message-input-send{
  display: flex;
  align-items: center;
  justify-content: center;

}

.message-input-send button{
  width: 15%;
  padding: 4px;
  font-size: 16px;
  color: rgb(255, 255, 255);
  background-color: rgb(72, 173, 190);
  margin-right: 18px;
  margin-left: auto;
  border: none;
  cursor: pointer;
  border-radius: 5%;
}
</style>