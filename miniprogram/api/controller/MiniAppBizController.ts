import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host

export default class MiniAppBizController {
  static listBigModel = <MiniAppListBigModelResp>(data: MiniListBigModelReq) =>
    httpRequest.post<MiniAppListBigModelResp>(
      baseUrl + '/wx/miniapp/biz/list-big-model', data
    )

  static analyse = <AnalyseResp>(data: AnalyseReq) =>
    httpRequest.post<AnalyseResp>(
      baseUrl + '/wx/miniapp/biz/analyse', data
    )

}
export interface AnalyseResp {
  analyseFinishPath?: string;
  analyseResults?: AnalyseResult[];
}

export interface AnalyseResult {
  label?: string;
  rgb?: string;
  confidence?: string;
}

export interface MiniListBigModelReq {
  name?: string;
  age?: number;
}

export interface MiniAppListBigModelResp {
  bigModelReq?: BigModelResp[];
}

export interface BigModelResp {
  id?: number;
  name?: string;
  image?: string;
  description?: string;
  useCount?: number;
  status?: string;
}

export interface AnalyseReq {
  bigModelId?: number;
  objectId?: string;
}

