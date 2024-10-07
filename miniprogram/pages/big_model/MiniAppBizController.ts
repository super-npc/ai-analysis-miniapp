import { httpRequest } from '../../utils/request'
const baseUrl = require('../../api/base').allBaseUrl.GDEnvs.host

export default class MiniAppBizController {
  static listBigModel = <MiniAppListBigModelResp>(data: MiniListBigModelReq) =>
    httpRequest.post<MiniAppListBigModelResp>(
      baseUrl + '/wx/miniapp/biz/list-big-model', data
    )

}
export interface MiniListBigModelReq {
  name?: string;
  age?: number;
}

export interface MiniAppListBigModelResp {
  [x: string]: any
  bigModelReq?: BigModelReq[];
}

export interface BigModelReq {
  id?: number;
  name?: string;
  image?: string;
}

