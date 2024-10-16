import { ProjectInfoResp, WxMaJscode2SessionResult } from "../api/controller/MiniAppBaseController";

const PROJECT_INFO_KEY = "MiniAppBaseController.LoginResCache";

export default class LoginResCache {
  static saveStorage = (data: WxMaJscode2SessionResult): Promise<void> => {
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
  
  static getStorage = (): Promise<WxMaJscode2SessionResult> => {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: PROJECT_INFO_KEY,
        success: (res) => resolve(res.data),
        fail: reject
      });
    });
  };
}
