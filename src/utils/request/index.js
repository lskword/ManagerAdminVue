import axios from 'axios'

import {Message} from 'element-ui'


const server = axios.create({
  timeout: 5000,
  baseURL: process.env.BASE_API
})

/**
 * [config description] 请求数据前 参数处理
 * @type {[type]}
 */
server.interceptors.request.use(config=> {
  console.log(config.data);
  config.headers = {
    "token": "CoolLskToken",
    "Content-type": 'multipart/form-data'
  }

  return config
}, err=> {
  console.error(err);
  return Promise.reject(err)
})

/**
 * [config description]请求数据后 参数处理
 * @type {[type]}
 */
server.interceptors.response.use(resp=> {
  // console.log(resp);
  const res = resp.data;
  const request = resp.request;
  if (res.code === '2005') {
    Message({
      message: res.msg,
      type: 'error',
      duration: 5* 1000
    })
    return Promise.reject("error")
  } else if (res.code === '2004') {

    Message({
      message: '请联系管理员，系统被人炸了！',
      type: 'error',
      duration: 5* 1000
    })
    return Promise.reject("Error " + request.responseURL +" ---------错误信息 " + res.msg)

  } else {
    return res
  }
}, err=> {
  console.error(err);
  return Promise.reject(err)
})

export default server
