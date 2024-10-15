import { ProjectInfoResp } from "../api/controller/MiniAppBaseController";

const PROJECT_INFO_KEY = "MiniAppBaseController.projectInfoResp";

export default class ProjectInfoRespCache {
  static saveStorage = (data: ProjectInfoResp): Promise<void> => {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key: PROJECT_INFO_KEY,
        data: data,
        success: () => {
          resolve();
        },
        fail: (error) => {
          console.error("缓存失败:", error);
          reject(error);
        }
      });
    });
  };
  
  static getStorage = (): Promise<ProjectInfoResp> => {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: PROJECT_INFO_KEY,
        success: (res) => resolve(res.data),
        fail: reject
      });
    });
  };
}
