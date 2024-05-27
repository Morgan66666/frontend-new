import axios from "./axiosConfig.ts";
import store from "../store/index.ts";


// 接口配置
//注意，后端apifox中定义的id有时候简写有时候全写，这里要要求全部使用全写，如id写出userId
let apiConfig = {
  login: [
  //登入登出相关
    { name: "doLogin", method: "post", url: "/api/auth/login", headers: null, noToken: true }, //登入
    { name: "doLogout", method: "post", url: "/api/auth/logout", headers: null },
    { name: "doRegister", method: "post", url: "/api/auth/register", headers: null, noToken: true}
  ], //登出
    
  //用户模块相关
  user: [{ name: "getUserInfoByUserId", method: "get", url: "/api/users/{userId}" },//根据id获得用户信息
  { name: "getUserInfoByUserName", method: "get", url: "/api/users" },//根据名字获得用户信息
  { name: "updateUser", method: "patch", url: "/api/users/update" },//更新用户信息
  { name: "updateUserPassword", method: "patch", url: "/api/users/{userId}/password" }, //更新用户密码
  { name: "getCommentsByUserId", method: "get", url: "/api/users/{userId}/comments" },//根据id获得用户评论
  ],
  //帖子相关
  post: [
    { name: "createPost", method: "post", url: "/api/posts" },//创建帖子
    { name: "getPostByPostId", method: "get", url: "/api/posts/{postId}" },//根据帖子id获得帖子
    { name: "getPopularPost", method: "get", url: "/api/posts/popular" },//获取热门帖子
    { name: "updatePost", method: "put", url: "/api/posts/update" },//修改帖子
    { name: "deletePost", method: "delete", url: "/api/posts/{postId}" },//删除帖子
    { name: "getPosts", method: "get", url: "/api/posts" },//获得帖子,什么参数都不给，就是随便拿一些帖子
    { name: "getPostsByUserId", method: "get", url: "/api/posts" },//根据用户id获得帖子
    { name: "getPostsByTitle", method: "get", url: "/api/posts" },//根据标题获得帖子
    { name: "getPostsByType", method: "get", url: "/api/posts" },//根据类型获得帖子
    { name: "getPostsByBody", method: "", url: "/api/posts" },//根据帖子内容获得帖子
    { name: "getCommentsByPostId", method: "get", url: "/api/posts/{postId}/comments" },//根据帖子id获得评论
  ],
  //管理员相关
  admin: [
    { name: "exportActivities", method: "get", url: "/api/admin/activities/export" },//导出活动
    { name: "banPost", method: "post", url: "/api/admin/posts/{postId}/ban" },//禁止帖子
    { name: "banComment", method: "post", url: "/api/admin/comments/{commentId}/ban" },//禁止评论
  ],
  //评论相关
  comment: [
    { name: "createComment", method: "post", url: "/api/comments" },//创建评论
    { name: "getCommentByCommentId", method: "get", url: "/api/comments/{commentId}" },//根据评论id获得评论
    { name: "updateComment", method: "put", url: "/api/comments/update" },//修改评论
    { name: "deleteComment", method: "delete", url: "/api/comments/{commentId}" },//删除评论
  ],
  //活动相关
  activity: [
    { name: "createActivity", method: "post", url: "/api/activities" },//创建活动
    { name: "getActivityByActivityId", method: "get", url: "/api/activities/{activityId}" },//根据活动id获得活动
    { name: "updateActivity", method: "put", url: "/api/activities/update" },//修改活动
    { name: "deleteActivity", method: "delete", url: "/api/activities/{activityId}" },//删除活动
    { name: "getActivities", method: "get", url: "/api/activities" },//根据时间、标题等获得活动
  ],
  //oss相关
  oss: [
    { name: "getSignature", method: "get", url: "/api/oss/signature" },//获得oss签名
  ]
};
// 获取token，与后端交互时的秘钥，不用每次调用接口都传，直接在这里统一处理了
let getTokenFn = () => {
  if (!store.getters.LoginIn) {
    return "";
  }
  return { authorization: `Bearer ${store.getters.getToken}` };
}
// 格式化参数
/*
  当接口为get的时候，参数要拼接到url后面，
*/
let formatParamsFn = (params: any) => {
  let str = [];
  console.log("调用了formatParamsFn");
  for (let key in params) {
    str.push(`${key}=${params[key]}`);
  }
  return str.join("&");
}
// 获取地址，打包时，根据不同的环境获取对应的地址，比如：测试环境，生成环境
let getUrlFn = (params: { [key: string]: string } = {}, item: any = {}) => {
  //将{}替换为对应的参数，并将path参数从params中删除
  let reg = /{([^{}]+)}/g;
  item = { ...item };

  item.url = item.url.replace(reg, (_: string, $1: string) => {
    let val = params[$1];
    delete params[$1];
    return val || "";
  });
  if (item.method === 'get' && Object.keys(params).length > 0) {
    item.url += '?' + formatParamsFn(params);
  }

  return item.url;
}
// 工厂函数，把apiConfig下的各个模块的api配置，生成方法，等待调用
let toApiFn = (configData: any = null) => {
  // 接口对象
  let api: { [key: string]: any } = {};
  if (configData) {
    for (let modeName in configData) {
      api[modeName] = {};
      let modeApiConfig: { [key: string]: any } = configData[modeName] || [];
      modeApiConfig.forEach((modeItem: any) => {
        if (modeItem?.name) {
          api[modeName][modeItem.name] = (params = {},
            option: { method: string | null, url: string | null, headers: { [key: string]: string } | null } = { method: null, url: null, headers: null }) => {
            // option 调用接口时，可以自定义一些配置项
            // params 参数
            let token = modeItem.noToken ? "" : getTokenFn();
            return axios({
              method: option.method ?? modeItem.method ?? 'post',
              url: option.url ?? getUrlFn(params, modeItem),
              data: params,
              headers: { ...modeItem.headers, ...option.headers, token },
            }).then((res: any = {}) => {
              // let status = res.status;
              // // 获取到接口请求结果后，统一在这里处理，外面调用的时候，就不用管接口是否成功或者
              // // 失败后处理逻辑，只关注业务逻辑就好了
              // if (status == 200) {
              //   let data = res.data || {};
              //   if (data.code == 401) {
              //     return
              //   }
              //   return data;
              // }
              // return {
              //   code: res.status,
              //   msg: res.statusText,
              // };
              return res;
            });
          }
        }
      });
    }
  }
  return api;
}
// 调用工厂函数，生成对象，并导出，我们可以在main.js中import，把他挂到vue的原型上就可以实现
// 子组件中直接this调用了，而不需要每次都import
export default toApiFn(apiConfig);
