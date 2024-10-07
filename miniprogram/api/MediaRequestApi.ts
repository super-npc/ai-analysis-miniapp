import { httpRequest } from "../utils/request";
const baseUrl = require('base').allBaseUrl.GDEnvs.host


export default class MediaRequestApi {

  /**
   * 上传文件
   * @param filePath 上传文件路径
   */
  static upload = (filePath: string) =>
    httpRequest.uploadFile(baseUrl + '/wx/miniapp/media/upload',filePath)

}