import MediaRequestApi from "../../api/MediaRequestApi";
import PictureAnalyseController, { AnalyseResp } from "./PictureAnalyseController";

// pages/demo/index.ts
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
    showCamera: false,
    src: '',
    modelId: '',
    modelText: '',
    modelImage: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    error(e: any) {
      console.error('相机错误:', e.detail);
      wx.showToast({
        title: '相机出现错误',
        icon: 'none'
      });
      this.setData({
        showCamera: false
      });
    },

    toggleCamera() {
      this.setData({
        showCamera: !this.data.showCamera
      });
    },
    
    toServiceAnalysis(picPath: string){
      // 先对图片显示出来,并有loading的效果,直到服务器图片分析完之后再显示
      this.setData({
        src: picPath
      });
       // 上传图片到服务器进行分析图片,回调完成
       // 上传图片到服务器进行分析图片,回调完成
      const analyseResp = PictureAnalyseController.upload(picPath) as unknown as AnalyseResp;
      console.log('返回结果:'+analyseResp.aa);
    },

    takePhoto() {
      const camera = wx.createCameraContext();
      camera.takePhoto({
        quality: 'high',
        success: (res) => {
          let picPath = res.tempImagePath;
          console.log("照片路径:" + picPath);
          // 服务器分析图片
          this.toServiceAnalysis(picPath);
        },
        fail: (res) => {
          console.log("拍照异常" + res.errMsg);
          wx.showToast({
            title: '拍照失败',
            icon: 'none'
          });
        }
      });
    },

    chooseImage() {
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          let picPath = res.tempFiles[0].tempFilePath;
          console.log("选择的图片路径:" + picPath);
          // 服务器分析图片
          this.toServiceAnalysis(picPath);
        },
        fail: (res) => {
          console.log("选择图片异常" + res.errMsg);
          wx.showToast({
            title: '选择图片失败',
            icon: 'none'
          });
        }
      });
    }
  },
  lifetimes: {
    attached() {
      const eventChannel = this.getOpenerEventChannel();
      if (eventChannel) {
        eventChannel.on('acceptDataFromOpenerPage', (res) => {
          const { id, text, image } = res.data;
          this.setData({
            modelId: id,
            modelText: text,
            modelImage: image
          });
          console.log('接收到的大模型数据:', { id, text, image });
        });
      } else {
        console.error('无法获取事件通道');
      }
    }
  }
})