import MiniAppBizController, { BigModelResp } from "../../api/controller/MiniAppBizController";
import { AnalyseResp, AnalyseResult } from "../../api/controller/MiniAppBizController";
import CloudController from "../../api/system/CloudController";
import CloudStorageUtil from "../../utils/CloudStorageUtil";
import { CloudUploadRes, } from "../../utils/request";

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
    analyseResults: [] as AnalyseResult[],
    bigModelResp: {} as BigModelResp, // 添加 BigModelResp 对象
    visible: true,
    marquee2: {
      speed: 60,
      loop: -1,
      delay: 0,
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    error(e: any) {
      console.error('相机错误:', e.detail);
      wx.showToast({
        title: e.detail.errMsg || '相机出现错误',
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

    async toServiceAnalysis(picPath: string) {
      // 先展示原始图片
      this.setData({
        src: picPath
      });

      // 显示加载中遮罩层
      wx.showLoading({
        title: '分析中...',
        mask: true
      });

      CloudController.uploadCloud(picPath).then((cloudRes: any) =>{
        const uploadRes = cloudRes as CloudUploadRes;
        MiniAppBizController.analyse({bigModelId:this.data.bigModelResp.id,objectId:uploadRes.fileID}).then(res => {
          const analyseResp = res as unknown as AnalyseResp
          // 更新显示的图片和分析结果
          const picUrl = CloudStorageUtil.convertFileIdToUrl(analyseResp.analyseFinishPath || '');
          this.setData({
            src: picUrl,
            analyseResults: analyseResp.analyseResults ? analyseResp.analyseResults.map(result => ({
              ...result,
              rgb: `rgb(${result.rgb})` // 将rgb字符串转换为CSS颜色格式
            })) : []
          });
        }).finally(() => {
          // 无论成功与否，都隐藏加载中遮罩层
          wx.hideLoading();
        });
      })
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
    },

    previewImage() {
      if (this.data.src) {
        wx.previewImage({
          urls: [this.data.src],
          current: this.data.src
        });
      }
    }
  },
  lifetimes: {
    attached() {
      const eventChannel = this.getOpenerEventChannel();
      if (eventChannel) {
        eventChannel.on('acceptDataFromOpenerPage', (res) => {
          this.setData({
            bigModelResp: res.data // 直接将接收到的对象赋值给 bigModelResp
          });
          console.log('接收到的大模型数据:', this.data.bigModelResp);
        });
      } else {
        console.error('无法获取事件通道');
      }
    }
  }
})