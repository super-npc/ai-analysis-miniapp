/**
 * 获取小程序版本信息
 * 值有：develop(开发版)、trial(体验版)、release(正式版)
*/
const accountInfo = wx.getAccountInfoSync()
const envVersion = accountInfo.miniProgram.envVersion || 'release'


/**
   * 国地服务器
  */
const GDEnvs = {
  develop: {
    host: 'http://127.0.0.1:80',
    // host: 'http://192.168.31.141:8080',
    imgHost: 'http://192.168.0.2:20087'
  },
  trial: {
    host: 'http://192.168.0.1:20086',
    imgHost: 'http://192.168.0.2:20086'
  },
  release: {
    host: 'https://XXXXX.com',
    imgHost: 'http://image.XXXXX.com'
  },
}

export class allBaseUrl {
  /**
   * 国地服务器
  */
  static GDEnvs = GDEnvs[envVersion]
  static appId = "wx13754984438a1b4d"
}