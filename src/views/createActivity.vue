<template>
  <div class="creator">
    <el-form :model="form" ref="formRef" label-width="120px">
      <el-form-item label="活动标题" :rules="[{ required: true, message: '请输入活动标题', trigger: 'blur' }]">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="活动描述" :rules="[{ required: true, message: '请输入活动描述', trigger: 'blur' }]">
        <el-input type="textarea" v-model="form.description" rows="3"></el-input>
      </el-form-item>
      <el-form-item label="预订开始时间" :rules="[{ required: true, message: '请选择预订开始时间', trigger: 'blur' }]">
        <el-date-picker
          v-model="form.bookBeginTime"
          type="datetime"
          placeholder="选择预订开始时间"
          :picker-options="bookBeginPickerOptions"
          :disabled-date="disabledBookBeginDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="预订结束时间" :rules="[{ required: true, message: '请选择预订结束时间', trigger: 'blur' }]">
        <el-date-picker
          v-model="form.bookEndTime"
          type="datetime"
          placeholder="选择预订结束时间"
          :picker-options="bookEndPickerOptions"
          :disabled-date="disabledBookEndDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动开始时间" :rules="[{ required: true, message: '请选择活动开始时间', trigger: 'blur' }]">
        <el-date-picker
          v-model="form.activityBeginTime"
          type="datetime"
          placeholder="选择活动开始时间"
          :picker-options="activityBeginPickerOptions"
          :disabled-date="disabledActivityBeginDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动结束时间" :rules="[{ required: true, message: '请选择活动结束时间', trigger: 'blur' }]">
        <el-date-picker
          v-model="form.activityEndTime"
          type="datetime"
          placeholder="选择活动结束时间"
          :picker-options="activityEndPickerOptions"
          :disabled-date="disabledActivityEndDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="参与人数上限" :rules="[{ required: true, message: '请输入参与人数上限', trigger: 'blur' }]">
        <el-input-number v-model="form.capacity" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="活动地点" :rules="[{ required: true, message: '请输入活动地点', trigger: 'blur' }]">
        <el-input v-model="form.location"></el-input>
      </el-form-item>
      <el-form-item label="活动类型" :rules="[{ required: true, message: '请输入活动类型', trigger: 'blur' }]">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="活动内容" :rules="[{ required: true, message: '请输入活动内容', trigger: 'blur' }]">
        <div class="editor">
          <editor @update:content="handleUpdate" ref="quillContent"/>
        </div>
      </el-form-item>
      <el-form-item label="活动图片">
        <el-upload
          class="upload-demo"
          drag
          :http-request="uploadImage"
          multiple
          :limit="1"
        >
          <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
          <div class="el-upload__text">
            拖拽文件至此或 <em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png文件，大小不超过500kb
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit" :disabled="!isFormValid">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed, inject} from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { UploadRequestOptions} from 'element-plus/es/components/upload/src/upload';
import { UploadFilled } from '@element-plus/icons-vue';
import { ActivityDetail, SignatureInfo } from '@/types';
import Editor from "@/components/editor.vue";
import * as timeUtil from '@/utils/timeUtil.ts';
import router from "@/router";

const form = ref<Partial<ActivityDetail>>({
  title: '',
  description: '',
  bookBeginTime: '',
  bookEndTime: '',
  activityBeginTime: '',
  activityEndTime: '',
  capacity: 0,
  price: 0,
  location: '',
  type: '',
  content: '',
  img: ''
});

const formRef = ref<FormInstance>();
const quillContent = ref();

const today = new Date();

const bookBeginPickerOptions = {
  disabledDate: (time: Date) => time.getTime() < today.getTime()
};

const bookEndPickerOptions = {
  disabledDate: (time: Date) => {
    const bookBeginTime = form.value.bookBeginTime ? new Date(form.value.bookBeginTime).getTime() : today.getTime();
    return time.getTime() <= bookBeginTime || time.getTime() < today.getTime();
  }
};

const activityBeginPickerOptions = {
  disabledDate: (time: Date) => {
    const bookEndTime = form.value.bookEndTime ? new Date(form.value.bookEndTime).getTime() : today.getTime();
    return time.getTime() <= bookEndTime || time.getTime() < today.getTime();
  }
};

const activityEndPickerOptions = {
  disabledDate: (time: Date) => {
    const activityBeginTime = form.value.activityBeginTime ? new Date(form.value.activityBeginTime).getTime() : today.getTime();
    return time.getTime() <= activityBeginTime || time.getTime() < today.getTime();
  }
};

const disabledBookBeginDate = (time: Date) => time.getTime() < today.getTime();

const disabledBookEndDate = (time: Date) => {
  const bookBeginTime = form.value.bookBeginTime ? new Date(form.value.bookBeginTime).getTime() : today.getTime();
  return time.getTime() <= bookBeginTime || time.getTime() < today.getTime();
};

const disabledActivityBeginDate = (time: Date) => {
  const bookEndTime = form.value.bookEndTime ? new Date(form.value.bookEndTime).getTime() : today.getTime();
  return time.getTime() <= bookEndTime || time.getTime() < today.getTime();
};

const disabledActivityEndDate = (time: Date) => {
  const activityBeginTime = form.value.activityBeginTime ? new Date(form.value.activityBeginTime).getTime() : today.getTime();
  return time.getTime() <= activityBeginTime || time.getTime() < today.getTime();
};



const handleUpdate = () => {
  if (quillContent.value && quillContent.value.editor) {
    form.value.content = quillContent.value.editor.querySelector('.ql-editor').innerHTML;
  }
};

const uploadImage = async (options: UploadRequestOptions) => {
  const { file } = options;
  try {
    const signatureInfo: SignatureInfo = await getOssSignature();
    const formData = new FormData();
    const extension = (file.name as string).split('.').pop();
    const uniqueFilename = `${uuidv4()}.${extension}`;

    if (extension !== 'jpg' && extension !== 'png') {
      ElMessage.error('只能上传jpg或png格式的图片');
      return;
    }

    formData.append('key', `${signatureInfo.dir}${uniqueFilename}`);
    formData.append('policy', signatureInfo.policy);
    formData.append('OSSAccessKeyId', signatureInfo.accessid);
    formData.append('signature', signatureInfo.signature);
    formData.append('file', file as File);

    await axios.post(signatureInfo.host, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    form.value.img = `${signatureInfo.host}/${uniqueFilename}`;
    ElMessage.success('上传成功');
  } catch (error) {
    ElMessage.error('上传失败或获取签名信息失败');
  }
};

async function getOssSignature(): Promise<SignatureInfo> {
  try {
    const response = await api.oss.getSignature();
    if (response) {
      return response;
    } else {
      throw new Error('获取签名信息失败');
    }
  } catch (error) {
    throw error;
  }
}

const isFormValid = computed(() => {
  return (
    form.value.title &&
    form.value.description &&
    form.value.bookBeginTime &&
    form.value.bookEndTime &&
    form.value.activityBeginTime &&
    form.value.activityEndTime &&
    form.value.capacity! > 0 &&
    form.value.location &&
    form.value.type &&
    form.value.content
  );
});

const api:any = inject("$api");

const handleSubmit = async () => {
  try {
    if (!formRef.value) return;
    await formRef.value.validate();
    // 假设调用API创建活动
    const activity = {
      ...form.value,
      bookBeginTime: timeUtil.convertLocalToTimestamp(form.value.bookBeginTime!),
      bookEndTime: timeUtil.convertLocalToTimestamp(form.value.bookEndTime!),
      activityBeginTime: timeUtil.convertLocalToTimestamp(form.value.activityBeginTime!),
      activityEndTime: timeUtil.convertLocalToTimestamp(form.value.activityEndTime!),
    }
    await api.activity.createActivity(activity).then((res: any) => {
      console.log(res);
    });
    console.log('Form Submitted', form.value);
    ElMessage.success('活动创建成功');
    // 重置表单
    handleReset();
    await router.push({path: '/activities'});
  } catch (error) {
    ElMessage.error('活动创建失败');
  }


};

const handleReset = () => {
  form.value = {
    title: '',
    description: '',
    bookBeginTime: '',
    bookEndTime: '',
    activityBeginTime: '',
    activityEndTime: '',
    capacity: 0,
    price: 0,
    location: '',
    type: '',
    content: '',
    img: ''
  };
};
</script>

<style scoped>
.upload-demo {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  background-color: #f5f5f5;
  text-align: center;
  cursor: pointer;
  color: #999;
  padding: 20px;
}

.el-icon--upload {
  font-size: 48px;
  color: #999;
}

.editor {
  min-height: 300px;
}

.creator {
  margin: 5vh 25vw;
  padding-bottom: 5vh;
}
</style>
