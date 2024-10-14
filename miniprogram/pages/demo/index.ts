import MiniAppBizController, { BigModelResp, MiniAppListBigModelResp } from '../../api/biz/MiniAppBizController';
const baseUrl = require('../../api/base').allBaseUrl.GDEnvs.host

Component({
  data: {
    bigModelList: [] as BigModelResp[]   
  },

  methods: {
    onItemTap(event: any) {
      const item = event.currentTarget.dataset.item;
      wx.navigateTo({
        url: `/pages/ai_analysis/index`,
        success(data) {
          data.eventChannel.emit('acceptDataFromOpenerPage', { data: item })
        }
      });
      
    },
    async fetchBigModelList() {
      try {
        const response = await MiniAppBizController.listBigModel({name:"",age:11}) as MiniAppListBigModelResp;
        this.setData({
          bigModelList: Array.isArray(response.bigModelReq) ? response.bigModelReq.map((item): BigModelResp => ({
            id: Number(item.id) || 0,
            name: item.name || '',
            image: item.image || '',
            description: item.description || '',
            status: item.status || '',
            useCount: item.useCount || '0'  // 添加了useCount字段
          })) : []
        });
      } catch (error) {
        console.error('获取大模型列表失败:', error);
        wx.showToast({
          title: '获取大模型列表失败',
          icon: 'none'
        });
      }
    },

  },
   /**
   * 生命周期函数--在组件实例进入页面节点树时执行
   */
  lifetimes: {
    attached() {
      this.fetchBigModelList();
    }
  }
})