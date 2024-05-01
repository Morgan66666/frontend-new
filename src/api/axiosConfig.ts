// axios默认配置，如如特需需求，不用修改
import axios from 'axios';
import qs from 'qs';
//此文件配置请求前置操作,后置操作

const instance = axios.create({
    transformRequest: [function(data) {
        // Do whatever you want to transform the data
        return qs.stringify(data, {arrayFormat: 'indices'});
    }],
    baseURL: 'http://localhost:23309',
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    timeout: 60000,
});
instance.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error);
    // 这里我们把错误信息扶正, 后面就不需要写 catch 了
    return Promise.resolve({
        isSuccess: false,
        status: error.response ? error.response?.statusText : "",
        statusText: error.response?.statusText,
    });
});
export default instance;

