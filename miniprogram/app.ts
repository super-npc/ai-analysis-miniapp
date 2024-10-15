import WxMiniAppUserController, { WxMaJscode2SessionResult } from "./api/controller/WxMiniAppUserController";


// app.ts
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
    // 使用callContainer前一定要init一下，全局执行一次即可
    wx.cloud.init({
      env: "prod-5g3l0m5je193306f",
      traceUser: true
    });
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // const aa = wx.getStorage({
    //   key: "",
    //   success(res) {
    //     res.data;
    //   }
    // });


    // 登录
    wx.login({
      success: res => {
        console.log("登录:" + res.code)
        WxMiniAppUserController.login({ code: res.code }).then((res) => {
          const loginRes = res as unknown as WxMaJscode2SessionResult;
          wx.setStorage({ key: "loginRes", data: loginRes });
        });
      },
    })
  },
})