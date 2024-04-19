<template>
  <quill-editor class="quill-editor"
    v-model="content"
    :options="editorOptions"
    :disabled="state.disabled"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
    @change="onEditorChange($event)"
    @imageAdded="handleImageAdded"
  />


</template>
  
<script lang="ts">
import {reactive, ref} from 'vue'
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'



export default {
  name: 'App',
  components: {QuillEditor},
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  setup({ emit }:any) {

    const content = ref('');
    const editorOptions = ref({
      theme: 'snow',
      modules: {
        toolbar: [
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
          ['image'], // 添加图片按钮
          ['clean']
        ]
      }
    });


    const state = reactive({
      content: '<p>2333</p>',
      _content: '',
      editorOption: {
        placeholder: 'core',
        modules: {
          // toolbars: [
            // custom toolbars options
            // will override the default configuration
          // ],
          // other moudle options here
          // otherMoudle: {}
        },
        // more options
      },
      
      disabled: false
    })

    const onEditorBlur = (quill:any) => {
      console.log('editor blur!', quill)
    }
    const onEditorFocus = (quill:any) => {
      console.log('editor focus!', quill)
    }
    const onEditorReady = (quill:any) => {
      console.log('editor ready!', quill)
    }
    const onEditorChange = ({ quill, html, text }:any) => {
      console.log('editor change!', quill, html, text)
      state._content = html
      emit('update:content', html);
    }

    const handleImageAdded = async (file:any, Editor:any, cursorLocation:any) => {
      console.log('file', file)
      console.log('Editor', Editor)
      console.log('cursorLocation', cursorLocation)
    }

    return { state, onEditorBlur, onEditorFocus, onEditorReady, onEditorChange, content, editorOptions, handleImageAdded }
  },
}
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