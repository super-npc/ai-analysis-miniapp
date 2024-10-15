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
    useCloudContainer: true,
    host: '', // 调用云托管
    
    // useCloudContainer: false,
    // host: 'http://127.0.0.1:80',
    // host: 'https://springboot-3dxz-1725083-1259198184.ap-shanghai.run.tcloudbase.com',
  },
  trial: {
    host: '',
    /** 是否使用微信云托管 */
    useCloudContainer: true
  },
  release: {
    host: '', // 云托管不需要host
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