#!/bin/bash

# 停止并删除现有容器
docker stop frontend || true
docker rm frontend || true

# 尝试删除旧镜像
docker rmi sustechcs304/frontend:latest || true

# 拉取最新镜像
docker pull sustechcs304/frontend:latest

# 启动新容器
docker run -d --name frontend -p 45632:80 sustechcs304/frontend:latest
