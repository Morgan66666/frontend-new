<template>
  <div class="chat-container">
    <div class="chat-messages">
      <div v-for="(message, index) in chatHistory" :key="index" :class="['message', message.role === 'User' ? 'sent' : 'received']" v-html="renderMarkdown(message.content)">
      </div>
    </div>
    <div class="chat-input">
      <input v-model="userInput" type="text" placeholder="发送消息" @keyup.enter="submitQuestion" style="height: 50px"/>
      <button @click="submitQuestion" class="send-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="black" fill-rule="evenodd" d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z" clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {inject, onBeforeMount, onMounted, ref} from 'vue';
import { marked } from 'marked';
import {ActivityDetail, Post} from "@/types";
import {convertTimestampToLocal} from "@/utils/timeUtil.ts";

interface Message {
  role: string;
  content: string;
}

interface PromptPayload {
  prompt: string;
}

interface AIResponse {
  response: string;
}

const userInput = ref('');
const chatHistory = ref<Message[]>([]);

const submitQuestion = async () => {
  if (userInput.value.trim() === '') {
    alert('请输入问题');
    return;
  }

  // 用户的问题加入历史记录
  chatHistory.value.push({ role: 'User', content: userInput.value });

  // 构建完整的prompt，包括历史对话
  let prompt = '';
  prompt += "Helper Setting:\n"
  prompt += "你是一个校园娱乐活动以及论坛的AI助手，可以帮助用户关于活动和帖子的问题。\n"
  prompt += "你可以回答关于活动和帖子的问题，也可以帮助用户进行活动和帖子的搜索。\n"
  prompt += "Helper Setting End\n"
  prompt += "Data:\n";
  prompt += "Activity:\n";
  let s = JSON.stringify(activityList.value);
  prompt += s;
  prompt += "\nPost:\n";
  s = JSON.stringify(postList.value);
  prompt += s;
  prompt += "DataEnd\n";
  prompt += chatHistory.value.map(msg => `${msg.role}: ${msg.content}`).join('\n');
  console.log(prompt);
  const aiResponse = ref('正在生成回答...');
  chatHistory.value.push({ role: 'AI', content: aiResponse.value });
  userInput.value = '';
  // const api:any = inject('$api');


  try {
    const response = await fetch('https://ai.cxp666.cn/api/ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt } as PromptPayload)
    });
    const data: AIResponse = await response.json();
    aiResponse.value = data.response;

    // api.ai.generate(JSON.stringify({ prompt } as PromptPayload)).then((res: any) => {
    //   if (res == undefined) {
    //     aiResponse.value = res.response;
    //   }
    //   else console.log(res)
    // })



    // 更新AI的回答
    chatHistory.value[chatHistory.value.length - 1].content = aiResponse.value;
  } catch (error) {
    aiResponse.value = '请求失败，请稍后再试。';
    // 更新AI的回答
    chatHistory.value[chatHistory.value.length - 1].content = aiResponse.value;
  }

  userInput.value = '';
};

const activityList = ref<ActivityDetail[]>([]);
const postList = ref<Post[]>([]);

const api:any = inject('$api');

let as1:any = null;
let as2:any = null;

function getActivityAndPost() {
  let form = {
    pageSize: 1000,
    pageNum: 1
  }
  as1 = api.post.getPosts(form).then((res: any) => {
    postList.value = res.records
  })
  as2 = api.activity.getActivities(form).then((res: any) => {
    activityList.value = res.records
    console.log("aaaa", activityList.value)
  })
}

onBeforeMount(() => {

});

onMounted(() => {
  chatHistory.value.push({ role: 'AI', content: '你好，我是AI助手，有什么问题可以帮到您？' });
  getActivityAndPost()
  Promise.all([as1, as2]).then(() => {
    activityList.value.forEach((activity) => {
      activity.activityBeginTime = convertTimestampToLocal(activity.activityBeginTime);
      activity.activityEndTime = convertTimestampToLocal(activity.activityEndTime);
      activity.bookBeginTime = convertTimestampToLocal(activity.bookBeginTime);
      activity.bookEndTime = convertTimestampToLocal(activity.bookEndTime);
    });
    postList.value.forEach((post) => {
      post.createTime = convertTimestampToLocal(post.createTime!);
    });
  })
})



const renderMarkdown = (text: string) => {
  return marked(text);
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100% - 3.5em);
  background-color: transparent;
}


.chat-messages {
  flex: 1;
  padding: 10px 10vw;
  overflow-y: auto;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: calc(100% - 90px);
  margin-top: 5px;
}

.message {
  max-width: 60%;
  margin-bottom: 10px;
  padding: 10px 20px;
  border-radius: 10px;
}

.sent {
  background-color: #daf8cb;
  align-self: flex-end;
}

.received {
  background-color: #f1f1f1;
  align-self: flex-start;
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 25px;
  position: fixed;
  bottom: 20px;
  width: calc(100% - 40px);
  max-width: 800px;
  left: 50%;
  transform: translateX(-50%);
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 20px;
  margin: 0 10px;
  background-color: #f0f0f0; /* 浅灰色背景 */
}

.chat-input button {
  background: none;
  border: none;
  cursor: pointer;
}

.send-button {
  background-color: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.send-button svg {
  width: 24px;
  height: 24px;
  fill: white;
}
</style>
