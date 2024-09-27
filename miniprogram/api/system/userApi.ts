import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host

export default class userApi {

  /**
   * 登录获取openId
   * @param data 
   */
  static login = <LoginReq>(data: LoginReq) =>
    httpRequest.post<LoginResp>(
      baseUrl + '/user/login', data
    )
  /**
   * 获取用户信息
   * @param data 
   */
  static getUserInfo = (data: WxSessionReq) =>
    httpRequest.post<WxMaUserInfo>(
      baseUrl + '/get-user-info', data
    )
}

export interface WxMaUserInfo {
  nickName: string;
  gender: string;
  language: string;
  city: string;
  province: string;
  country: string;
  avatarUrl: string;
  /**
   * 不绑定开放平台不会返回这个字段
   */
  unionId: string;
  watermark: Watermark;
}

interface Watermark {
  timestamp: string;
  appid: string;
}

interface WxSessionReq {
  openId: string;
  sessionKey: string;
  signature: string;
  rawData: string;
  encryptedData: string;
  iv: string;
}

export interface LoginResp {
  sessionKey: string;
  openid: string;
  unionid: string | null;
}

interface LoginReq {
  code: string;
}