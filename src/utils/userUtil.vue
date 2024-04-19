<script lang="ts">
  // 定义一些公共的属性和方法
  // import axios from "axios";

  export function getUserInfo(id:any) {
    //根据id获得用户信息
    console.log("根据id获得用户信息" + id);
    // let userInfo = axios.get("http://localhost:8080/userInfo", {
    //   params: {
    //     id: id,
    //   },
    // });
     let userInfo = {
        avatar: '霍霍.png',
        account:"1234567890", // "账号" 
        username: '花开富贵',
        userId: id,
        signature: '个性签名',
      }
      return userInfo;
    };

  // 暴露出这些属性
</script>

