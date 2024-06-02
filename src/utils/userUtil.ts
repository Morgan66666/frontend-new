
import api from "@/api"


export function getUserInfo(id:any) {

  return api.user.getUserInfoByUserId({userId: id});
}



