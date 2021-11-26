import axios from "axios"
import { BASE_URL, TIME_OUT } from "./config"

// import { useStore } from "vuex"

export const sendReq = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})
// 添加请求拦截器
sendReq.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = JSON.parse(localStorage.getItem("token"))
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
sendReq.interceptors.response.use(
  (response) => {
    return response.data
  },
  (e) => Promise.reject(e)
)
