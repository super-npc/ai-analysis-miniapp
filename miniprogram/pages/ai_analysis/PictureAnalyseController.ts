import { httpRequest } from "../../utils/request";
const baseUrl = require('../../api/base').allBaseUrl.GDEnvs.host

export default class PictureAnalyseController {

  /**
   * 上传文件
   * @param filePath 上传文件路径
   */
  static upload = <AnalyseResp>(filePath: string, data: AnalyseReq) =>
    httpRequest.uploadFile<AnalyseResp>(baseUrl + '/wx/miniapp/biz/picture/analyse',filePath,data)

}

export interface AnalyseReq{
  bigModelId: number
}

export interface AnalyseResp{
  analyseFinishPath: string
}