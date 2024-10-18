import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host

export default class MiniAppBaseController {
  static login = <WxMaSessionResp>(data: WxLoginReq) =>
    httpRequest.post<WxMaSessionResp>(
      baseUrl + '/wx/miniapp/user/login', data
    )
static getProjectInfo = <ProjectInfoResp>() =>
    httpRequest.post<ProjectInfoResp>(
      baseUrl + '/wx/miniapp/base/get-project-info'
    )

}
export interface WxMaSessionResp {
  sessionKey?: string;
  openid?: string;
  unionid?: string;
}
export interface ProjectInfoResp {
  applicationName?: string;
}
export interface WxLoginReq {
  code?: string;
  appId?: string;
}

