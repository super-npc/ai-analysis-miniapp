import { allBaseUrl } from "../api/base"
import { LoginResp } from "../api/system/userApi"

/**
 * @description: HTTP请求方法枚举
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  OPTIONS = 'OPTIONS',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

/**
 * @description: HTTP请求配置
*/
interface RequestConfig {
  /** API路径 */
  url?: string
  /** Method类型 */
  method?: HttpMethod
  /** 接口返回数据 */
  data?: ApiData
  /** 无TOKEN触发异常捕获时，是否执行异常逻辑 */
  needToken?: boolean
  /** Header头部 */
  header?: object
  /** 返回的数据格式 */
  dataType?: string
  /** 请求报错时，是否弹出message提示（默认弹出）*/
  noShowMsg?: boolean
  /** 是否使用微信云托管 */
  useCloudContainer?: boolean
}

interface ApiData {
  traceId: string
  commit: string
  msg: string
  /** 接口返回数据 */
  data?: any
}

/**
 * @description: 声明业务数据类型
*/
export interface MyAwesomeData<T> {
  code: number
  msg: string
  data: T
}

class HttpRequest {
  private static instance: HttpRequest
  private constructor() { }
  /** 请求函数(单例模式)
  *
  * **注意：**
  * `method`需使用`HttpMethod`枚举类，切勿自行定义
  *
  * **示例代码**
  * ```js
   HttpRequest.getInstance().request({
     url: '/Api',
     method: HttpMethod.GET
   })
  * ```
  */
  public static getInstance(): HttpRequest {
    if (!this.instance) {
      this.instance = new HttpRequest()
    }
    return this.instance
  }

  // 处理请求异常状态码
  private handerErrorStatus(statusCode: number, requestConfig: RequestConfig) {
    let msg = '服务找不到'
    if (statusCode === 502 || statusCode === 503) {
      msg = '服务器开小差了~'
    }
    !requestConfig.noShowMsg && wx.showToast({
      title: `${msg}，错误码：${statusCode}`,
      icon: 'none'
    })
    return msg
  }

  // 处理请求异常
  private handerError(err: { errMsg: string }, requestConfig: RequestConfig) {
    let msg = `请求异常`
    if (/timeout/.test(err.errMsg)) {
      msg = '请求超时'
    }
    !requestConfig.noShowMsg && wx.showToast({
      title: msg,
      icon: 'none'
    });
    return msg
  }

  // 上传文件
  public uploadFile<T>(url: string, filePath: string, data: any, useCloudContainer: boolean = false): Promise<MyAwesomeData<T>> {
    return new Promise((resolve, reject) => {
      const header = {
        'appId': allBaseUrl.appId
      } as any;
      
      wx.getStorage<LoginResp>({
        key: "loginRes",
        success(res) {
          const loginRes = res.data;
          header['openid'] = loginRes.openid;
          header['sessionKey'] = loginRes.sessionKey;
          header['unionid'] = loginRes.unionid;
        },
        complete() {
          if (useCloudContainer) {
            wx.cloud.uploadFile({
              cloudPath: Math.random().toString(36).substring(2, 15),
              filePath: filePath,
              config: {
                env: "prod-5g3l0m5je193306f"
              },
              header: {
                ...header,
                "X-WX-SERVICE": "springboot-3dxz"
              },
              success: (res) => {
                if (res.statusCode === 200) {
                  resolve(res.fileID as any);
                } else {
                  const errMsg = "上传失败";
                  console.log("捕获云托管上传异常信息:" + errMsg);
                  wx.showModal({
                    title: '上传失败',
                    content: errMsg,
                    showCancel: false,
                    confirmText: '确定'
                  });
                  reject(new Error(`云托管上传失败，状态码：${res.statusCode}`));
                }
              },
              fail: (err) => {
                reject(new Error('云托管上传失败：' + err.errMsg));
              }
            });
          } else {
            wx.uploadFile({
              url: url,
              filePath: filePath,
              formData: data,
              name: Math.random().toString(36).substring(2, 15),
              header: header,
              success: (res) => {
                if (res.statusCode === 200) {
                  resolve(JSON.parse(res.data).data)
                } else {
                  const errMsg = JSON.parse(res.data).msg
                  console.log("捕获http异常信息:" + errMsg);
                  wx.showModal({
                    title: '上传失败',
                    content: errMsg,
                    showCancel: false,
                    confirmText: '确定'
                  });
                  reject(new Error(`上传失败，状态码：${res.statusCode}`));
                }
              },
              fail: (err) => {
                reject(new Error('上传失败：' + err.errMsg));
              }
            });
          }
        }
      });
    });
  }

  // 服务器接口请求
  public request<T>(requestConfig: RequestConfig): Promise<MyAwesomeData<T>> {
    console.log("发起请求");

    let _this = this
    return new Promise((resolve, reject) => {
      // 默认header
      const contentType = requestConfig.method === 'GET' ? 'application/x-www-form-urlencoded' : 'application/json'
      const header = {
        'content-type': contentType,
        'appId': allBaseUrl.appId
      } as any;
      // 动态添加header属性
      wx.getStorage<LoginResp>({
        key: "loginRes",
        success(res) {
          const loginRes = res.data;
          header['openid'] = loginRes.openid;
          header['sessionKey'] = loginRes.sessionKey;
          header['unionid'] = loginRes.unionid;
        },
        complete() {
          // 判断是否使用微信云托管
          if (requestConfig.useCloudContainer) {
            wx.cloud.callContainer({
              config: {
                env: "prod-5g3l0m5je193306f"
              },
              path: requestConfig.url || '',
              header: {
                ...header,
                "X-WX-SERVICE": "springboot-3dxz"
              },
              method: requestConfig.method as "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT",
              data: requestConfig.data,
              success: function (res) {
                _this.handleResponse(res, requestConfig, resolve, reject);
              },
              fail: err => {
                _this.handleFailure(err, requestConfig, reject);
              }
            });
          } else {
            wx.request({
              method: requestConfig.method,
              url: `${requestConfig.url}`,
              data: requestConfig.data,
              header: Object.assign(header, requestConfig?.header),
              success: function (res) {
                _this.handleResponse(res, requestConfig, resolve, reject);
              },
              fail: err => {
                _this.handleFailure(err, requestConfig, reject);
              }
            });
          }
        }
      });
    });
  }

  private handleResponse(res: any, requestConfig: RequestConfig, resolve: Function, reject: Function) {
    const code = res.statusCode || -404;
    const apiData = res.data as unknown as ApiData;
    const data1 = apiData.data;

    if (code == 200) {
      resolve(data1);
    } else if (code === 401) {
      this.handleUnauthorized(requestConfig, reject, apiData);
    } else {
      this.handleOtherErrors(code, requestConfig, apiData, reject);
    }
  }

  private handleUnauthorized(requestConfig: RequestConfig, reject: Function, apiData: ApiData) {
    !requestConfig.noShowMsg && wx.showModal({
      title: '登录失效',
      content: '登录失效，请重新登录',
      showCancel: false,
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/login/index'
          });
        }
      }
    });
    reject({ code: 401, msg: '未登录', data: apiData });
  }

  private handleOtherErrors(code: number, requestConfig: RequestConfig, apiData: ApiData, reject: Function) {
    const errMsg = apiData.msg || this.handerErrorStatus(code, requestConfig);
    console.log("捕获http异常信息:" + errMsg);

    !requestConfig.noShowMsg && wx.showModal({
      title: '请求失败',
      content: errMsg,
      showCancel: false,
      confirmText: '确定'
    });
    reject({ code, msg: errMsg, data: apiData });
  }

  private handleFailure(err: any, requestConfig: RequestConfig, reject: Function) {
    let msg = this.handerError(err, requestConfig);
    wx.showModal({
      title: '请求错误',
      content: msg,
      showCancel: false,
      confirmText: '确定'
    });
    reject({ msg });
  }

  /**
   * @description: get请求函数
   * @param {string} url 请求地址
   * @param {Object} data 请求参数
   * @param {RequestConfig} OtherConfig request其他配置
   * @return {*}
   */
  public get<T>(url: string, data?: any, OtherConfig?: RequestConfig) {
    return this.request<T>({ method: HttpMethod.GET, url, data, ...OtherConfig })
  }

  /**
   * @description: post请求函数
   * @param {string} url 请求地址
   * @param {Object} data 请求参数
   * @param {RequestConfig} OtherConfig request其他配置
   * @return {*}
   */
  public post<T>(url: string, data: any, OtherConfig?: RequestConfig) {
    return this.request<T>({ method: HttpMethod.POST, url, data, ...OtherConfig })
  }

  /**
   * @description: delete请求函数
   * @param {string} url 请求地址
   * @param {ApiData} data 请求参数
   * @param {RequestConfig} OtherConfig request其他配置
   * @return {*}
   */
  public delete<T>(url: string, data: any, OtherConfig?: RequestConfig) { // 修改 Object 为 ApiData
    return this.request<T>({ method: HttpMethod.DELETE, url, data, ...OtherConfig })
  }

  /**
   * @description: put请求函数
   * @param {string} url 请求地址
   * @param {Object} data 请求参数
   * @param {RequestConfig} OtherConfig request其他配置
   * @return {*}
   */
  public put<T>(url: string, data?: any, OtherConfig?: RequestConfig) {
    return this.request<T>({ method: HttpMethod.PUT, url, data, ...OtherConfig })
  }

}

export const httpRequest = HttpRequest.getInstance()