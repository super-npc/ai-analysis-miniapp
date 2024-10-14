import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host

export default class WxMiniAppUserController {
  static login = <WxMaJscode2SessionResult>(data: WxLoginReq) =>
    httpRequest.post<WxMaJscode2SessionResult>(
      baseUrl + '/wx/miniapp/user/login', data
    )

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

