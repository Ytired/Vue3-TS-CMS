// 通过process.env.NODE_ENV可以区分项目的启动模式
// 在不同的模式下给baseURL赋值不同的地址
let baseURL: string
const timeout = 10000

switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = '/api'
    break
  case 'production':
    baseURL = 'http://152.136.185.210:5000'
    break
  case 'test':
    baseURL = 'http://152.136.185.210:5000'
    break
}

// 想要在声明后再导出的话 就要用对象
export { baseURL, timeout }
