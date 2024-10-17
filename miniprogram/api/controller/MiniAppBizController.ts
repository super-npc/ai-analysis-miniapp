import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host

export default class MiniAppBizController {
  static listBigModel = <MiniAppListBigModelResp>(data: MiniListBigModelReq) =>
    httpRequest.post<MiniAppListBigModelResp>(
      baseUrl + '/wx/miniapp/biz/list-big-model', data
    )

static listAnalyseJob = <ListAnalyseJobResp>(data: ListAnalyseJobReq) =>
    httpRequest.post<ListAnalyseJobResp>(
      baseUrl + '/wx/miniapp/biz/list-analyse-job', data
    )

static submitAnalyseJob = <SubmitAnalyseJobResp>(data: SubmitAnalyseJobReq) =>
    httpRequest.post<SubmitAnalyseJobResp>(
      baseUrl + '/wx/miniapp/biz/submit-analyse-job', data
    )

static queryAnalyseJob = <QueryAnalyseJobResp>(data: QueryAnalyseJob) =>
    httpRequest.post<QueryAnalyseJobResp>(
      baseUrl + '/wx/miniapp/biz/query-analyse-job', data
    )

}
export interface SubmitAnalyseJobReq {
  bigModelId?: number;
  objectId?: string;
}

export interface QueryAnalyseJob {
  miniAppAnalyseJobId?: number;
  appId?: string;
  openId?: string;
}

export interface ListAnalyseJobReq {
  a?: string;
  appId?: string;
  openId?: string;
}

export interface SubmitAnalyseJobResp {
  miniAppAnalyseJobId?: number;
  sourceObjectId?: string;
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

export interface ListAnalyseJobResp {
  a?: string;
}

export interface MiniListBigModelReq {
  name?: string;
  age?: number;
}

export interface QueryAnalyseJobResp {
  analyseJobVo?: AnalyseJobVo;
}

export interface Yolo8ModelVo {
  name?: string;
}

export interface AnalyseResult {
  label?: string;
  rgb?: string;
  confidence?: string;
}

export interface AnalyseJobVo {
  yoloModel?: Yolo8ModelVo;
  sourceObjectId?: string;
  targetObjectId?: string;
  analyseResults?: AnalyseResult[];
  processStatus?: ProcessStatus;
}

export enum ProcessStatus{
        /** 待处理 */
    PENDING,

    /** 运行中 */
    RUNNING,

    /** 已暂停 */
    PAUSED,

    /** 成功 */
    SUCCESS,

    /** 失败 */
    FAIL,

    /** 已取消 */
    CANCELED,

}

