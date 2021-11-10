// import axios from 'axios'
// import { stringify } from 'qs'


// export const get = (path, params) => {
//   if (Reflect.ownKeys(params).length > 0) {
//     path = `${path}?${stringify(params)}`
//   }
//   return axios
//     .get(path)
//     .then(response => response.data)
//     .then(json => {
//       if (json.status === 1) {
//         return json.data
//       } else {
//         return new Promise().reject({ message: json.message, status: json.status })
//       }
//     })
//     .catch(err => console.log(err))
// }



import axios from 'axios'
import { Notification } from 'element-ui'
import { stringify } from 'qs'

axios.defaults.withCredentials = true

const de = (target = {}) => {
  if (Array.isArray(target)) {
    return target
  }
  const ks = Reflect.ownKeys(target).filter((key) => {
    return (target[key] || target[key] === 0 || target[key] === false) && !/^__/.test(key)
  })
  const k = ks.reduce((ar, it) => {
    ar[it] = target[it]
    return ar
  }, {})

  return k
}

const handleErr = ({ message, status, response }, path) => {
  if (response && response.status === 403) {
    const loginUrl = window.location.origin.replace('operate', 'www')
    Notification({
      title: '未登录',
      dangerouslyUseHTMLString: true,
      message: `<p style="color:#F56C6C; word-wrap:break-word; ">请前往<a href="${loginUrl}">登录</a></p >`,
      type: 'error',
      position: 'top-right',
      duration: 5000,
    })
    return
  }
  Notification({
    title: '请求错误',
    dangerouslyUseHTMLString: true,
    message: `<p style="color:#F56C6C; word-wrap:break-word; ">请求:&nbsp;${path}</p style="word-wrap:break-word;"><p>错误原因: &nbsp;${message}</p>`,
    type: 'error',
    position: 'top-right',
    duration: 5000,
  })
  return Promise.reject({ status, message })
}
export const get = (path, params, config) => {
  if (params) {
    params = de(params)
    if (Reflect.ownKeys(params).length > 0) {
      path = `${path}?${stringify(params)}`
    }
  }
  return axios
    .get(path, config)
    .then((response) => response.data)
    .then((json) => {
      if (json.status === 1) {
        return json.data
      } else {
        return Promise.reject({
          message: json.message,
          status: json.status,
        })
      }
    })
    .catch((err) => handleErr(err, path))
}

export const post = (path, params, config) => {
  const noticeDisable = config && config.noticeDisable
  if (config) {
    delete config.noticeDisable
  }
  const defaultConfig = {
    credentials: 'include',
  }
  const newConfig = { ...defaultConfig, ...config }

  newConfig.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    ...newConfig.headers,
  }

  newConfig.body = JSON.stringify(newConfig.body)

  if (!(params instanceof FormData) && !Array.isArray(params)) {
    params = de(params)
  }
  if (newConfig.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
    params = stringify(params)
  }

  return axios
    .post(path, params, newConfig)
    .then((response) => response.data)
    .then((json) => {
      json = newConfig.success ? newConfig.success(json) : json
      if (json.status === 1) {
        if (!noticeDisable) {
          Notification({
            title: '操作成功',
            dangerouslyUseHTMLString: true,
            type: 'success',
            position: 'top-right',
            duration: 5000,
          })
        }
        return json.data || true
      } else {
        return Promise.reject({
          message: json.message,
          status: json.status,
        })
      }
    })
    .catch((err) => handleErr(err, path))
}

export const put = (path, params, config) => {
  const defaultConfig = {
    credentials: 'include',
  }
  const newConfig = { ...defaultConfig, ...config }

  newConfig.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    ...newConfig.headers,
  }

  newConfig.body = JSON.stringify(newConfig.body)
  if (!(params instanceof FormData)) {
    params = de(params)
  }
  if (newConfig.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
    params = stringify(params)
  }
  return axios
    .put(path, params, newConfig)
    .then((response) => response.data)
    .then((json) => {
      json = newConfig.success ? newConfig.success(json) : json
      if (json.status === 1) {
        Notification({
          title: '操作成功',
          dangerouslyUseHTMLString: true,
          type: 'success',
          position: 'top-right',
          duration: 5000,
        })
        return json.data || true
      } else {
        return Promise.reject({
          message: json.message,
          status: json.status,
        })
      }
    })
    .catch((err) => handleErr(err, path))
}

export const Delete = (path, params, config) => {
  const defaultConfig = {
    credentials: 'include',
  }
  const newConfig = { ...defaultConfig, ...config }

  newConfig.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    ...newConfig.headers,
  }

  newConfig.body = JSON.stringify(newConfig.body)
  if (!(params instanceof FormData)) {
    params = de(params)
  }
  if (newConfig.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
    params = stringify(params)
  }
  return axios
    .delete(path, { data: params }, newConfig)
    .then((response) => response.data)
    .then((json) => {
      json = newConfig.success ? newConfig.success(json) : json
      if (json.status === 1) {
        Notification({
          title: '删除成功',
          dangerouslyUseHTMLString: true,
          type: 'success',
          position: 'top-right',
          duration: 5000,
        })
        return json.data || true
      } else {
        return Promise.reject({
          message: json.message,
          status: json.status,
        })
      }
    })
    .catch((err) => handleErr(err, path))
}

export const patch = (path, params, config) => {
  const defaultConfig = {
    credentials: 'include',
  }
  const newConfig = { ...defaultConfig, ...config }

  newConfig.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    ...newConfig.headers,
  }

  newConfig.body = JSON.stringify(newConfig.body)
  if (!(params instanceof FormData)) {
    params = de(params)
  }
  if (newConfig.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
    params = stringify(params)
  }
  return axios
    .patch(path, params, newConfig)
    .then((response) => response.data)
    .then((json) => {
      json = newConfig.success ? newConfig.success(json) : json
      if (json.status === 1) {
        Notification({
          title: '操作成功',
          dangerouslyUseHTMLString: true,
          type: 'success',
          position: 'top-right',
          duration: 5000,
        })
        return json.data || true
      } else {
        return Promise.reject({
          message: json.message,
          status: json.status,
        })
      }
    })
    .catch((err) => handleErr(err, path))
}

export const postForm = (...args) => {
  const config = args[2] || {}
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  }
  args[2] = config
  return post(...args)
}

export const putForm = (...args) => {
  const config = args[2] || {}
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  }
  args[2] = config
  return put(...args)
}

const fetch = (method) => (url) => (params) => method(url, params)

export const fetchGet = fetch(get)
export const fetchPost = fetch(post)
export const fetchPut = fetch(put)
