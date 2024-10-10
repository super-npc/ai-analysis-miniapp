// pages/big_model/index.ts
import MiniAppBizController, { MiniAppListBigModelResp } from '../../api/biz/MiniAppBizController';
const baseUrl = require('../../api/base').allBaseUrl.GDEnvs.host

interface BigModelItem {
  id: string;
  text: string;
  image: string;
}

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
    bigModelList: [] as BigModelItem[],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async fetchBigModelList() {
      try {
        const response = await MiniAppBizController.listBigModel({name:"",age:11}) as MiniAppListBigModelResp;
        this.setData({
          bigModelList: Array.isArray(response.bigModelReq) ? response.bigModelReq.map((item): BigModelItem => ({
            id: item.id?.toString() || '',
            text: item.name || '',
            image: baseUrl + item.image || ''
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

    onGridItemTap(event: any) {
      const { id } = event.currentTarget.dataset;
      const selectedModel = this.data.bigModelList.find(item => item.id === id);
      if (selectedModel) {
        const params = {
          id: selectedModel.id,
          text: selectedModel.text,
          image: selectedModel.image
        };
        wx.navigateTo({
          url: `/pages/ai_analysis/index`,
          success(data) {
            data.eventChannel.emit('acceptDataFromOpenerPage', { data: params })
          }
        });
      }
    }
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