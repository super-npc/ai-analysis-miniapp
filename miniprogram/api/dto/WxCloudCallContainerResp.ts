import { ApiData } from "../../utils/request";

export interface WxCloudCallContainerHeader {
  'Content-Type': string;
  Date: string;
  Server: string;
  'X-Cloudbase-Request-Id': string;
  'X-Cloudbase-Upstream-Status-Code': string;
  'X-Cloudbase-Upstream-Timecost': string;
  'X-Cloudbase-Upstream-Type': string;
  'X-Request-Id': string;
  'X-Upstream-Status-Code': string;
  'X-Upstream-Timecost': string;
  'Transfer-Encoding': string;
}

export interface WxCloudCallContainerResp {
  data: ApiData;
  statusCode: number;
  header: WxCloudCallContainerHeader;
  callID: string;
}

