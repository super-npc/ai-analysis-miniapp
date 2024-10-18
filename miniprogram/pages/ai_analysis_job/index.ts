import MiniAppBizController, { ListAnalyseJobResp } from "../../api/controller/MiniAppBizController";

Component({
  properties: {
    // 可以添加需要的属性
  },

  data: {
    products: []
  },

  lifetimes: {
    attached() {
      this.fetchProductData();
    }
  },

  methods: {
    fetchProductData() {
      // 假设 wx.cloud.callFunction 是调用云函数的方法
      MiniAppBizController.listAnalyseJob({}).then((res: ListAnalyseJobResp) => {
        this.setData({
          products: res
        });
      }).catch(err => {
        console.error('获取数据失败:', err);
        wx.showToast({
          title: '获取数据失败',
          icon: 'none'
        });
      });
    },

    onShareTap() {
      // 实现分享功能
      wx.showToast({
        title: '分享功能待实现',
      wx.cloud.callFunction({
        name: 'MiniAppBizController',
        data: {
          action: 'listAnalyseJob'
        }
      }).then(res => {
        // 假设返回的数据结构与我们需要的格式相符
        this.setData({
          products: res.result
        });
      }).catch(err => {
        console.error('获取数据失败:', err);
        wx.showToast({
          title: '获取数据失败',
          icon: 'none'
        });
      });
    },

    onShareTap() {
      // 实现分享功能
      wx.showToast({
        title: '分享功能待实现',
        icon: 'none'
      });
    }
  }
});
