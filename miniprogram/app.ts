// app.ts
App<IAppOption>({
  globalData: {
    
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
    
    let wifi = wx.getWifiList()
  
    
    

    // 登录
    wx.login({
      success: res => {
        console.log("登录:"+res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://127.0.0.1:9090/wx/miniapp/user/login',
            method: "GET",
            data: {
              appId: 'wx13754984438a1b4d',
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
    })
  },
})