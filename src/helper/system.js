const device = require('@system.device')
const storage = require('@system.storage')

let data = {
    // 设备信息
    deviceInfo: {},
    // 缓存cache（storage的复制体，是storage的同步解决方案）
    cache: {
        // token
        token: '',
        // 用户信息
        userinfo: {}
    }
}

// 将 storage 全量同步到内部数据 cache（需保证 cache 中的 key 与 storage 一致）
// 获取 storage 数据的场景全部改用 cache（因为storage异步获取会有延迟的情况）
function reloadCache () {
    // 拿出cache的所有key
    const keys = Object.keys(data.cache)
    keys.forEach(item => {
        // 按照key将storage中数据同步到cache
        storage.get({
            key: item,
            success: (res) => {
                data.cache[item] = res
            }
        })
    })
}

// 先设置cache，并同步到storage，不需要关注 storage 的完成时机
function setCache ({ key, value, success }) {
    data.cache[key] = value
    storage.set({
        key,
        value,
        success
    })
}

// 设备信息
device.getInfo({
    success: function (ret) {
        data.deviceInfo = ret
    }
})

export default {
    data,
    reloadCache,
    setCache
}