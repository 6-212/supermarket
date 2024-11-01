import axios from 'axios'
// 创建 axios 实例
const http = axios.create({
//访问3000的后端服务接口
    baseURL: 'http://localhost:3000',
    timeout: 3000,
})
// 请求拦截器
http.interceptors.request.use(
// 可以在把请求发送给后端服务器前,进行拦截处理
    (config) =>{
        return config
    },
    function (error) {
// 请求失败,会执行这里面的代码
//...
    }
);
// 响应拦截器
http.interceptors.response.use(
    (response) => {
// 可以自己封装响应处理
        return response;
    },
    function (error) {
// 非2xx响应码的响应,都会执行这里面的代码
//...
    }
);
export default http;



