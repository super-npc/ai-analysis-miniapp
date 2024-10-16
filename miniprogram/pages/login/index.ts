import MiniAppBaseController, { WxMaJscode2SessionResult } from "../../api/controller/MiniAppBaseController";
import LoginResCache from "../../cache/LoginResCache";

// pages/login/index.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 控制弹出层的显示
    showModal: true,
    userInfo: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 显示弹出层
    showLoginModal() {
      this.setData({ showModal: true });
    },

    // 隐藏弹出层
    hideLoginModal() {
      this.setData({ showModal: false });
    },

    // 登录方法
    async login() {

      wx.login({
        success: res => {
          debugger
          console.log("登录:" + res.code)
          MiniAppBaseController.login({ code: res.code }).then((loginResThen: unknown | WxMaJscode2SessionResult) => {
            const loginRes = loginResThen as WxMaJscode2SessionResult;
            LoginResCache.saveStorage(loginRes);

            wx.getUserInfo({
              success: (userInfoRes) => {
                debugger
                MiniAppBaseController.getUserInfo({ openId: loginRes.openid, encryptedData: userInfoRes.encryptedData,
                   rawData: userInfoRes.rawData, sessionKey: loginRes.sessionKey, signature: userInfoRes.signature ,iv: userInfoRes.iv}).then(res =>{
                     debugger
                     console.log(res);
                   })
                console.log('用户名称:', userInfoRes.userInfo.nickName);
              },
              fail: (err) => {
                debugger
                console.error('获取用户信息失败:', err);
              }
            });

            // // 登录成功后跳转到用户中心页面
            // wx.switchTab({
            //   url: '/pages/usercenter/index',
            //   success: () => {
            //     console.log('成功跳转到用户中心页面');
            //   },
            //   fail: (error) => {
            //     console.error('跳转到用户中心页面失败:', error);
            //   }
            // });
          });
        },
      })



    }

  }
})
