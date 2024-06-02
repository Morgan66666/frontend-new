<template>
  <div ref="editor" class="ql-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, inject } from 'vue';
import { Quill } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SignatureInfo } from '@/types';

const instance = getCurrentInstance();
const proxy = instance?.proxy;
const emit = defineEmits(['update:content']);

const editor = ref<Quill | null>(null);
const exportedHtml = ref('');

const imageUrl = ref<string>('');

let quill: Quill = null;
const api = inject('$api') as any;

async function handleUpload(file: File) {
  try {
    const signatureInfo: SignatureInfo = await getOssSignature();
    console.log('获取签名信息成功', signatureInfo);
    const formData = new FormData();
    const extension = file.name.split('.').pop();
    const uniqueFilename = `${uuidv4()}.${extension}`;
    console.log('uniqueFilename', uniqueFilename);

    if (extension !== 'jpg' && extension !== 'png') {
      proxy?.$message.error('只能上传jpg或png格式的图片');
      return;
    }

    formData.append('key', `${signatureInfo.dir}${uniqueFilename}`);
    formData.append('policy', signatureInfo.policy);
    formData.append('OSSAccessKeyId', signatureInfo.accessid);
    formData.append('signature', signatureInfo.signature);
    formData.append('file', file);

    const response = await axios.post(signatureInfo.host, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('上传成功', response);
    imageUrl.value = `${signatureInfo.host}/${uniqueFilename}`;
    proxy?.$message.success('上传成功');
    imageUrl.value = `${signatureInfo.host}/${uniqueFilename}`;

  } catch (error) {
    console.error('上传失败或获取签名信息失败', error);
    proxy?.$message.error('上传失败或获取签名信息失败');
  }
}

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

function selectLocalImage(): void {
  console.log('Selecting image from local...');
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/png, image/jpeg');
  input.click();

  input.onchange = () => {
    const file = input.files ? input.files[0] : null;
    if (file) {
      handleUpload(file).then(() => {
        insertToEditor(imageUrl.value);
        console.log('Image uploaded and inserted into editor.');
      }).catch(error => {
        console.error('Error uploading image:', error);
      });
    }
  };
}

function insertToEditor(url: string): void {
  console.log('Inserting image:', url);
  const range = quill.getSelection(true);
  if (range) {
    quill.insertEmbed(range.index, 'image', url, Quill.sources.USER);
  }
}

function uploadImage() {
  selectLocalImage();
}

onMounted(() => {
  quill = new Quill(editor.value, {
    theme: 'snow',
    modules: {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ['image'],
          ['clean']
        ],
        handlers: {
          image: uploadImage,
        },
      },
    },
  });
  quill.on('text-change', function (delta: any, oldDelta: any, source: any) {
    console.log('A change occurred:', delta, oldDelta, source);
    exportHTML();
  });
});

function exportHTML() {
  exportedHtml.value = editor.value.querySelector('.ql-editor').innerHTML;
  emit('update:content', exportedHtml.value);
  return exportedHtml.value;
}

defineExpose({ exportHTML, editor });
</script>

<style scoped>
.ql-container {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  min-height: 200px;
  background-color: aliceblue;
  font-size: 20px;
}
</style>

<style>
.ql-editor img {
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
}
</style>
