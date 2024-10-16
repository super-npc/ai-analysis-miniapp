import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host

export default class MiniAppBaseController {
  static getUserInfo = <WxMaUserInfo>(data: WxSessionReq) =>
    httpRequest.post<WxMaUserInfo>(
      baseUrl + '/wx/miniapp/user/get-user-info', data
    )

static login = <WxMaJscode2SessionResult>(data: WxLoginReq) =>
    httpRequest.post<WxMaJscode2SessionResult>(
      baseUrl + '/wx/miniapp/user/login', data
    )

static getProjectInfo = <ProjectInfoResp>() =>
    httpRequest.post<ProjectInfoResp>(
      baseUrl + '/wx/miniapp/base/get-project-info'
    )

}
export interface WxMaUserInfo {
  nickName?: string;
  gender?: string;
  language?: string;
  city?: string;
  province?: string;
  country?: string;
  avatarUrl?: string;
  unionId?: string;
  watermark?: Watermark;
}

export interface Watermark {
  timestamp?: string;
  appid?: string;
}

export interface WxMaJscode2SessionResult {
  sessionKey?: string;
  openid?: string;
  unionid?: string;
}

export interface WxLoginReq {
  code?: string;
  appId?: string;
}

export interface WxSessionReq {
  openId?: string;
  sessionKey?: string;
  signature?: string;
  rawData?: string;
  encryptedData?: string;
  iv?: string;
}

export interface ProjectInfoResp {
  applicationName?: string;
}

