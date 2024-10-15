import { httpRequest } from "../../utils/request";

export default class CloudController {
  static uploadCloud = <CloudUploadRes>(filePath: string) =>
    httpRequest.uploadCloud<CloudUploadRes>(
      filePath
    )
}