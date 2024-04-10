<template>
  <v-container class="my-5">
    <v-row>
      <v-col cols="12" md="7">
        <!-- 图片轮播 -->
        <v-carousel cycle height="500"
                    hide-delimiters
                    show-arrows="hover"
        >
          <v-carousel-item
              v-for="image in images"
              :key="image"
              :src="image"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" md="5">
        <!-- 商品信息 -->
        <v-card class="pa-4 elevation-12">
          <v-card-title class="display-1">{{ productDetails.name }}</v-card-title>
          <v-card-subtitle class="headline">{{ productDetails.category }}</v-card-subtitle>
          <v-card-text>
            <div class="text-h4 py-4">价格: {{ productDetails.price }}</div>
            <div class="subtitle-1">选择配置:</div>
            <v-chip-group
                v-model="selectedOption"
                column
                active-class="deep-purple--text text--accent-4"
            >
              <v-chip
                  v-for="option in productDetails.options"
                  :key="option"
                  class="ma-2"
              >
                {{ option }}
              </v-chip>
            </v-chip-group>
            <div class="subtitle-1 mt-4">商品介绍:</div>
            <p>{{ productDetails.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" dark large>加入购物车</v-btn>
            <v-btn color="secondary" dark large>立即购买</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import { type Product } from '../types';


const images = ref<string[]>([
  'https://www.natgeo.com.cn/pic/program_default.768.jpg',
  'https://i.natgeofe.com/n/5d7fc2d3-30a5-475d-ba96-b35f4dc6d213/NationalGeographic_1517431_2x3.jpg?w=2880&h=4320',
  'https://i.natgeofe.com/n/519530cd-2b07-4722-86f4-1ef1887b0565/PIA10189_square.jpg?w=2880&h=2880'
]);

const product = reactive<Product>({
  name: 'Amazing Product',
  category: 'Electronics',
  price: '$399.99',
  options: ['32 GB', '64 GB', '128 GB'],
  description: 'This is a detailed description of the amazing product. It includes features like outstanding performance, high reliability, and a sleek design.'
});

const selectedOption = ref<string>('');
const productDetails = computed(() => product);
</script>


<style scoped>
/* 页面容器的间距 */
.my-5 {
  margin-top: 5rem;
  margin-bottom: 5rem;
}

/* 图片轮播的样式，添加一些视觉上的细节 */
.v-carousel {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
}

/* 商品信息卡片的阴影和内边距 */
.v-card {
  transition: box-shadow 0.3s;
  border-radius: 0.5rem;
}

/* 鼠标悬停在卡片上时增加阴影，提升交互效果 */
.v-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

/* 商品名称的样式 */
.display-1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

/* 商品类别的样式 */
.headline {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
}

/* 价格样式 */
.text-h4 {
  font-size: 2rem;
  font-weight: bold;
  color: #4CAF50; /* 可以根据实际品牌颜色调整 */
  margin-bottom: 2rem;
}

/* 选项配置的样式 */
.v-chip {
  margin: 0.5rem;
  font-size: 1.1rem;
}

/* 商品介绍文字的样式 */
p {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

/* 操作按钮的样式 */
.v-btn {
  font-size: 1.2rem;
  padding: 0.75rem 1.5rem;
  margin-right: 1rem;
  text-transform: none; /* 移除大写字母样式 */
}

.v-btn:focus {
  outline: none;
}
/* 响应式布局 */
@media (max-width: 960px) {
  .v-carousel,
  .v-card {
    margin-bottom: 2rem;
  }

  /* 在较小屏幕上卡片占据全部列宽 */
  .v-col {
    padding: 0;
  }

  /* 图片轮播在小屏幕的样式调整 */
  .v-carousel {
    height: 300px;
  }

  /* 在小屏幕上按钮宽度调整为100%，方便操作 */
  .v-card-actions {
    flex-direction: column;
  }

  .v-btn {
    width: 100%;
    margin: 0.5rem 0;
  }
}
</style>


