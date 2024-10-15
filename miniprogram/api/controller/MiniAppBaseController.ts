import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host

export default class MiniAppBaseController {
  static getProjectInfo = <ProjectInfoResp>() =>
    httpRequest.post<ProjectInfoResp>(
      baseUrl + '/wx/miniapp/base/get-project-info'
    )

static login = <WxMaJscode2SessionResult>(data: WxLoginReq) =>
    httpRequest.post<WxMaJscode2SessionResult>(
      baseUrl + '/wx/miniapp/user/login', data
    )

}
export interface WxLoginReq {
  code?: string;
  appId?: string;
}

export interface WxMaJscode2SessionResult {
  sessionKey?: string;
  openid?: string;
  unionid?: string;
}

export interface ProjectInfoResp {
  applicationName?: string;
}

