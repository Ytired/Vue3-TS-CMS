class LocalCache {
  // 写入
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  // 读取
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  // 删除
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  // 清除
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
