import { httpRequest } from '../../utils/request'
const baseUrl = require('../base').allBaseUrl.GDEnvs.host

export default class MiniAppBizController {
  static listBigModel = <MiniAppListBigModelResp>(data: MiniListBigModelReq) =>
    httpRequest.post<MiniAppListBigModelResp>(
      baseUrl + '/wx/miniapp/biz/list-big-model', data
    )
static queryAnalyseJob = <QueryAnalyseJobResp>(data: QueryAnalyseJob) =>
    httpRequest.post<QueryAnalyseJobResp>(
      baseUrl + '/wx/miniapp/biz/query-analyse-job', data
    )
static submitAnalyseJob = <SubmitAnalyseJobResp>(data: SubmitAnalyseJobReq) =>
    httpRequest.post<SubmitAnalyseJobResp>(
      baseUrl + '/wx/miniapp/biz/submit-analyse-job', data
    )
static listAnalyseJob = <ListAnalyseJobResp>(data: ListAnalyseJobReq) =>
    httpRequest.post<ListAnalyseJobResp>(
      baseUrl + '/wx/miniapp/biz/list-analyse-job', data
    )

}
export enum ProcessType{
        /** 运行中 */
    RUNNING,
    /** 完成 */
    FINISH,
    /** 未开始 */
    WAITING,

}
export enum StatusType{
        /** 失败 */
    FAIL,
    /** 成功 */
    SUCCESS,
    /** 已创建 */
    CREATED,

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
  process?: ProcessType;
  status?: StatusType;
}
export interface QueryAnalyseJobResp {
  analyseJobVo?: AnalyseJobVo;
}
export interface SubmitAnalyseJobReq {
  bigModelId?: number;
  objectId?: string;
}
export enum ProcessType{
        /** 运行中 */
    RUNNING,
    /** 完成 */
    FINISH,
    /** 未开始 */
    WAITING,

}
export enum StatusType{
        /** 失败 */
    FAIL,
    /** 成功 */
    SUCCESS,
    /** 已创建 */
    CREATED,

}
export interface Yolo8ModelVo {
  name?: string;
}
export interface AnalyseResult {
  label?: string;
  rgb?: string;
  confidence?: string;
}
export interface ListAnalyseJobResp {
  analyseJobVos?: AnalyseJobVo[];
}
export interface AnalyseJobVo {
  yoloModel?: Yolo8ModelVo;
  sourceObjectId?: string;
  targetObjectId?: string;
  analyseResults?: AnalyseResult[];
  process?: ProcessType;
  status?: StatusType;
}
export interface MiniListBigModelReq {
  name?: string;
  age?: number;
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
export interface BigModelResp {
  id?: number;
  name?: string;
  image?: string;
  description?: string;
  useCount?: number;
  status?: string;
}
export interface MiniAppListBigModelResp {
  bigModelReq?: BigModelResp[];
}
export interface SubmitAnalyseJobResp {
  miniAppAnalyseJobId?: number;
  sourceObjectId?: string;
}

