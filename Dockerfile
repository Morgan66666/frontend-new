# 使用最新的 Node.js 20 Alpine 镜像
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . .

# 清理 node_modules 和锁文件
RUN rm -rf node_modules package-lock.json pnpm-lock.yaml

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install

# 构建项目
RUN pnpm run build

# 生产阶段
FROM nginx:alpine

# 复制构建的文件到 Nginx 静态文件目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制自定义 Nginx 配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
