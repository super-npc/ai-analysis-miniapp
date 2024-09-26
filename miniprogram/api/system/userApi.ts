import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host

export default class userApi {

  /**
   * 登录获取openId
   * @param data 
   */
  static login = (data: LoginReq) =>
    httpRequest.get<LoginResp>(
      baseUrl + '/user/login?code='+data.code,
    )

  /**
   * @description: 获取用户信息
   * @return {*}
   */
  static getUserInfo = (data: UserInfo) =>
    httpRequest.post<ReturnUserInfo>(
      baseUrl + '/mock/getUserInfo',
      data
    )

  /**
   * @description: 
   * @return {*}
   */
  static getVillageList = () =>
    httpRequest.get<VillageList>(
      baseUrl + '/mock/villageList',
    )
}

export interface LoginResp{
  sessionKey: string;
  openid: string;
  unionid: string | null;
}

interface LoginReq{
  code: string;
}


interface UserInfo {
  username: string;
  password: string;
  // 这里可以添加其他用户信息字段
}

interface ReturnUserInfo {
  userId: number;
  username: string;
  email: string;
  // 这里可以添加其他返回的用户信息字段
}

interface VillageList {
  list: Array<{
    villageId: number;
    villageName: string;
    // 这里可以添加其他村庄信息字段
  }>;
}