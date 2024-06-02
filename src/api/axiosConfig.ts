// axios默认配置，如如特需需求，不用修改
import axios from 'axios';

//此文件配置请求前置操作,后置操作

const host = 'http://localhost:23309'

const instance = axios.create({
    // transformRequest: [function(data) {
    //     // Do whatever you want to transform the data
    //     return data;
    // }],
    baseURL: host,
    withCredentials: true,
    headers: {
        // 'Content-Type': 'application/json',
    },
    timeout: 2000,
});
instance.interceptors.response.use(response => {
    // console.log(response);
    return response.data;
}, error => {
    console.log(error);
    // 这里我们把错误信息扶正, 后面就不需要写 catch 了
    return Promise.resolve({
        isSuccess: false,
        status: error.response ? error.response?.statusText : "",
        statusText: error.response?.statusText,
        data: error.response ? error.response?.data : "",
        code: error.response ? error.response?.status : "",
    });
});
export default instance;
export host;

