import { httpRequest } from "../../utils/request";
const baseUrl = require('../../api/base').allBaseUrl.GDEnvs.host


export default class PictureAnalyseController {

  /**
   * 上传文件
   * @param filePath 上传文件路径
   */
  static upload = <AnalyseResp>(filePath: string) =>
    httpRequest.uploadFile<AnalyseResp>(baseUrl + '/wx/miniapp/biz/picture/analyse',filePath)

}

export interface AnalyseResp{
  aa: string
}