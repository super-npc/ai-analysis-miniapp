import WxMiniAppUserController, { ProjectInfoResp, WxMaSessionResp } from "./api/controller/MiniAppBaseController";
import LoginResCache from "./cache/LoginResCache";
import ProjectInfoRespCache from "./cache/ProjectInfoRespCache";

App<IAppOption>({
  globalData: {

  },
  onShow() {
    // 隐藏系统的tabBar
    // wx.hideTabBar({
    //   complete: (res) => {
    //     console.log("隐藏tabBar" + res);
    //   }
    // });
  },
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        console.log("登录:" + res.code)
        WxMiniAppUserController.login({ code: res.code }).then((res) => {
          const loginRes = res as unknown as WxMaSessionResp;
          LoginResCache.saveStorage(loginRes);
        });
      },
    })
    // 使用callContainer前一定要init一下，全局执行一次即可
    wx.cloud.init({
      env: "prod-5g3l0m5je193306f",
      traceUser: true
    });

    WxMiniAppUserController.getProjectInfo().then(res => {
      // 存储数据
      ProjectInfoRespCache.saveStorage(res as ProjectInfoResp);
      // 获取数据
      ProjectInfoRespCache.getStorage().then((projectInfoRespStorage: ProjectInfoResp) => {
        const applicationName = projectInfoRespStorage.applicationName;
        console.log('读取:' + applicationName);
      });
    });
  },
})