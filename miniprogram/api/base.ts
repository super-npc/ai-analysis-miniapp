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
    // host: '', // 调用云托管
    // host: 'http://192.168.31.141:8080',
    // imgHost: 'http://192.168.0.2:20087',
    /** 是否使用微信云托管 */
    useCloudContainer: false
  },
  trial: {
    host: 'http://192.168.0.1:20086',
    imgHost: 'http://192.168.0.2:20086',
    /** 是否使用微信云托管 */
    useCloudContainer: true
  },
  release: {
    host: 'https://XXXXX.com',
    imgHost: 'http://image.XXXXX.com',
    /** 是否使用微信云托管 */
    useCloudContainer: true
  },
}

export class allBaseUrl {
  /**
   * 国地服务器
  */
  static GDEnvs = GDEnvs[envVersion]
  static appId = "wx13754984438a1b4d"
}