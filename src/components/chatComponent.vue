<template>
  <div class="main_container">
    <div class="list">
      <div class="list-item" v-for="item in items" :key="item.id" @click="choose(item)"
        :class="{ active: item === selectedItem }">
        <img class="list-item-avatar" :src="item.avatar" alt="" />
        <a class="list-item-userName">{{ item.userName }}</a>
      </div>
    </div>
    <div class="content">
      <div class="message-list">
        <div v-for="item in selectedItem.messageList" :key="item.id" class="message-list-item"
          :class="{ right: item.userId === userId }">
          <img v-if="item.userId !== userId" class="message-list-item-avatar" :src="selectedItem.avatar" alt="" />
          <div class="message-list-item-content">{{ item.content }}</div>
          <img v-if="item.userId === userId" class="message-list-item-avatar" :src="userInfo.avatar" alt="" />
        </div>
      </div>
      <div id="message-input">
        <textarea ref="textarea" v-model="message" placeholder="Type a message..." @input="autoGrow"
          :style="{ maxHeight: '120px' }" />
        <div class="message-input-send" style="width: 100%">
          <button @click="sendMessage">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, inject } from "vue";
import store from "@/store";

interface message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createTime: string;
}
const userId = store.getters.getUserInfo?.userId;


const map = new Map();
const items = ref<any>([
]);

const selectedItem = ref({
  id: "",
  userName: "",
  avatar: "",
  messageList: [] as any[],
});
const message = ref("");
const textarea: any = ref(null);
const api: any = inject("$api")

const autoGrow = () => {
  if (textarea.value === null) {
    return;
  }
  // textarea.value.style.height = "auto";
  // textarea.value.style.height = textarea.value.scrollHeight + "px";
};

// 建立websocket连接

let socket: WebSocket | null = null;
const userInfo = ref(store.getters.userInfo);
// 获取host


onMounted(() => {
  //建立连接
  let token = store.getters.getToken;
  socket = new WebSocket('ws://localhost:23309/ws/create?session_id=' + token);
  // 获取所有聊天会话
  api.chat.getChatList().then((res: any) => {
    for (const item of res) {
      let userId = item.dstId;
      api.user.getUserInfoByUserId({ userId: userId }).then((res: any) => {
        map.set(userId, res);
        items.value.push({
          id: res.userId,
          userName: res.userName,
          avatar: res.avatar,
          vis: false,
          messageList: [] as any[],
        });
      });
    }
  });
  socket.onmessage = (event) => {
    // 假设后端返回的数据格式为 { id: string, userId: string, userName: string, content: string }

    const message = JSON.parse(event.data);
    console.log("接到信息，开始解析", message)
    let srcId = message.srcId
    if (map.has(srcId) && message.type != 3) {
      message.userId = srcId
      message.userName = map.get(srcId).userName;
      message.avatar = map.get(srcId).avatar;
      message.content = message.body;
      message.createTime = message.createTime;
    }
    srcId = message.srcId == userId ? message.dstId:message.srcId;

    for (const element of items.value) {
      if (element.id === srcId) {
        if (message.type != 3){
          element.messageList.push(message);
        }
        console.log("聊天信息存在")
        return;
      }
    }
    // 建立一个新的会话
    api.chat.createChat({ dstId: message.srcId }).then((res: any) => {
      console.log("建立会话", res)
      let userId = srcId;
      api.user.getUserInfoByUserId({ userId: userId }).then((res: any) => {
        map.set(userId, res);
        console.log("获取新建立的用户信息", res)
        let newItem = {
          id: res.userId,
          userName: res.userName,
          avatar: res.avatar,
          vis:true  ,
          messageList: [] as any[],
        };
        console.log("构建新的消息会话", newItem)
        items.value.push(newItem);
        api.chat.getChatRecord({ dstId: srcId }).then((res: any) => {
          for (const item of res) {
            console.log("聊天记录：", item)
            let newMes = {
              id: item.msgId,
              userId: item.srcId,
              userName: map.get(item.srcId).userName,
              content: item.body,
              createTime: item.createTime
            } as any;
            newItem.messageList.push(newMes);
            // Reflect.set(newItem, 'messageList', newItem.messageList.concat(newMes));
          }
          if( message.type != 3){
            newItem.messageList.push(message);
          }
        });
      });
    });
  }

  socket.onclose = (event) => {
    console.log('WebSocket is closed now.', event);
  };

  socket.onerror = (event) => {
    console.error('WebSocket error observed:', event);
  };
});

const sendMessage = () => {
  if (message.value === ""||selectedItem.value.id==="") {
    return;
  }

  let form = {
    srcId: userInfo.value.userId,
    dstId: selectedItem.value.id,
    body: message.value,
    type: 1,
    createTime: new Date().toISOString(),
    status: 0
  }
  let s = JSON.stringify(form);
  socket?.send(s);


  // selectedItem.value.messageList.push({
  //   id: selectedItem.value.id,
  //   userId: userId,
  //   userName: "Me",
  //   content: message.value,
  //   createTime: new Date().toISOString(),
  // });


  message.value = "";
  autoGrow();
};

const choose = (list: any) => {
  selectedItem.value = list
  if (list.vis){
    return
  }else{
    list.vis = true
  }
  selectedItem.value = list
  let srcId = list.id;
  api.chat.getChatRecord({ dstId: srcId }).then((res: any) => {
    console.log("res",res)
    for (const item of res) {
      let newMes = {
          id: item.msgId,
          userId: item.srcId,
          userName: map.get(item.srcId).userName,
          content: item.body,
          createTime: item.createTime
      };
      if(list.messageList.length == 0){
        list.messageList.push(newMes);
        continue
      }

      let repeat = false
      for (let i of list.messageList) {
        if (i.id === item.id) {
          repeat = true
          break
        } 
        
      }
      
      if(!repeat){
        list.messageList.push(newMes);
      }

      

      console.log("list",list)

    }
  });


}

watchEffect(() => {
  if (!store.getters.getIsLogin) {
    return
  }
  userInfo.value = store.getters.getUserInfo
  map.set(userInfo.value.userId, userInfo.value)
})









</script>

<script lang="ts">
export default {
  name: 'ChatComponent',
  // 其他选项...
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
  flex: 1;
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
  transition: background-color 0.3s ease;
}

.list-item-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(0, 0, 0);
  margin-left: 20px;
  align-self: center;
}

.list-item-userName {
  margin-left: 20px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  align-self: center;
}

.list-item:hover {
  background-color: rgb(200, 200, 200);
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
  height: 68%;
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
  height: 20%;
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

.message-input-send {
  display: flex;
  align-items: center;
  justify-content: center;

}

.message-input-send button {
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