<script lang="ts">
  // 定义一些公共的属性和方法
  // import axios from "axios";
  import api from "../api"



  export function getUserInfo(id:any) {
    
    let userInfo = api.user.getUserInfoByUserId({userId: id});

    return userInfo;
  }

  // 暴露出这些属性
</script>

