import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host

export default class MiniAppBizController {
  static listBigModel = <MiniAppListBigModelResp>(data: MiniListBigModelReq) =>
    httpRequest.post<MiniAppListBigModelResp>(
      baseUrl + '/wx/miniapp/biz/list-big-model', data
    )

}
export interface MiniAppListBigModelResp {
  bigModelReq?: BigModelResp[];
}

export interface BigModelResp {
  id?: number;
  name?: string;
  image?: string;
  description?: string;
  useCount?: string;
  status?: string;
}

export interface MiniListBigModelReq {
  name?: string;
  age?: number;
}

