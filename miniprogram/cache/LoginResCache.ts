import { WxMaSessionResp } from "../api/controller/MiniAppBaseController";


const PROJECT_INFO_KEY = "MiniAppBaseController.LoginResCache";

export default class LoginResCache {
  static then(arg0: (wxMaSessionResp: any) => void) {
    throw new Error("Method not implemented.");
  }
  static saveStorage = (data: WxMaSessionResp): Promise<void> => {
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
  
  static getStorage = (): Promise<WxMaSessionResp> => {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: PROJECT_INFO_KEY,
        success: (res) => resolve(res.data),
        fail: reject
      });
    });
  };
}
