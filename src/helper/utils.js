/**
 * 您可以将常用的方法、或系统 API，统一封装，暴露全局，以便各页面、组件调用，而无需 require / import.
 */
const prompt = require('@system.prompt')
const router = require('@system.router')
const storage = require('@system.storage')

/**
 * 拼接 url 和参数
 */
function queryString(url, query) {
  let str = []
  for (let key in query) {
    str.push(key + '=' + query[key])
  }
  let paramStr = str.join('&')
  return paramStr ? `${url}?${paramStr}` : url
}

function showToast(message = '', duration = 0) {
  if (!message) return
  prompt.showToast({
    message: message,
    duration
  })
}

// 页面跳转push
function push (uri, params = {}) {
  router.push({
    uri,
    params
  })
}

// 页面回退
function back () {
  router.back()
}

// 页面回退
function replace (uri, params = {}) {
  router.replace({
    uri,
    params
  })
}

// 退出登录
function logout () {
  storage.clear()
}

export default {
  showToast,
  queryString,
  push,
  back,
  replace,
  logout
}
