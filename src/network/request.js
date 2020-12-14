import axios from 'axios'
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  // axios的请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })
  // 响应拦截
  instance.interceptors.response.use(result => {
    // 返回的数据不知有我们要的数据，还有浏览器包装的东西。故取出真正的数据返回
    return result
  }, err => {
    console.log(err);
  })
  return instance(config)
}