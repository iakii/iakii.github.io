/**
 * axios 封装：统一请求入口、拦截器、全局错误处理
 * @module request
 */

/**
 * 创建 axios 实例
 */
const service = axios.create({
  baseURL: "/", // 可根据需要配置
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器（可注入 token、全局 loading 等）
service.interceptors.request.use(
  (config) => {
    // 可在此注入 token
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器（统一错误处理）
service.interceptors.response.use(
  (response) => {
    // 只返回 data 字段
    return response.data;
  },
  (error) => {
    // 可根据 error.response.status 做全局处理
    if (error.response) {
      // 统一错误提示
      // window?.alert?.(error.response.data?.message || '请求错误');
      console.error("请求错误:", error.response.data?.message || error.message);
    } else {
      console.error("网络异常:", error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * 通用请求方法
 * @param {import('axios').AxiosRequestConfig} config - axios 配置对象
 * @returns {Promise<any>} 响应数据
 */
function request(config) {
  return service(config);
}

// 便捷方法（可选）
const get = (url, params, config) => service.get(url, { params, ...config });
const post = (url, data, config) => service.post(url, data, config);
const put = (url, data, config) => service.put(url, data, config);
const del = (url, config) => service.delete(url, config);
