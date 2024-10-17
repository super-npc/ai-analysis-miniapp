// pages/usercenter/index.ts
import { WxMaSessionResp } from "../../api/controller/MiniAppBaseController";
import LoginResCache from "../../cache/LoginResCache";

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
    username: '请先登录'
  },

  /**
   * 生命周期函数
   */
  lifetimes: {
    attached() {
      this.loadUserInfo();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadUserInfo() {
      LoginResCache.getStorage().then((res) =>{
        const wxMaSessionResp  = res as WxMaSessionResp;
        this.setData({
          username: wxMaSessionResp.openid || '未知用户'
        });
      })
    },

    onCellClick(event: any) {
      const index = event.currentTarget.dataset.index;
      // 根据 index 处理点击事件
      console.log(`点击了设置 ${index + 1}`);
    }
  }
})