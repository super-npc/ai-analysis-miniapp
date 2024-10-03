import $api from "./api/index";
import { LoginResp } from "./api/system/userApi";


// app.ts
App<IAppOption>({
  globalData: {

  },
  onShow() {
    // 隐藏系统的tabBar
    wx.hideTabBar({
      complete: (res) => {
        console.log("隐藏tabBar" + res);
      }
    });
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const aa = wx.getStorage({
      key: "",
      success(res) {
        res.data;
      }
    });




    // 登录
    wx.login({
      success: res => {
        console.log("登录:" + res.code)
        $api.userApi.login({ code: res.code }).then((res) => {
          const loginRes = res as unknown as LoginResp;
          wx.setStorage({ key: "loginRes", data: loginRes });
        });
      },
    })
  },
})